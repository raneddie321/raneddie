"use client";

import { useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";

function SignInLink() {
  function openSignIn() {
    const returnTo = typeof window !== "undefined" ? window.location.href : "https://raneddie.com";
    window.location.href = `https://id.raneddie.com/sign-in?redirect_url=${encodeURIComponent(returnTo)}`;
  }
  return <button type="button" className="navlink account-nav-signin" onClick={openSignIn}>Sign in <span aria-hidden>↗</span></button>;
}

function ConnectedAccountMenu() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);

  if (!isLoaded) return <span className="account-nav-loading" aria-label="Loading account" />;
  if (!isSignedIn || !user) return <SignInLink />;

  return (
    <div className="raneddie-account-menu">
      <button className="raneddie-account-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span className="raneddie-account-avatar">
          {user.imageUrl ? <img src={user.imageUrl} alt="" /> : (user.firstName || user.username || user.primaryEmailAddress?.emailAddress || "R").slice(0, 1).toUpperCase()}
        </span>
        <span className="raneddie-account-name">{user.username || user.firstName || "Account"}</span>
        <span className="raneddie-account-chevron">⌄</span>
      </button>
      {open && (
        <>
          <button className="raneddie-account-dismiss" aria-label="Close account menu" onClick={() => setOpen(false)} />
          <div className="raneddie-account-dropdown">
            <div className="raneddie-account-dropdown-user">
              <b>{user.fullName || user.username || "RanEddie member"}</b>
              <small>{user.primaryEmailAddress?.emailAddress}</small>
            </div>
            <a href="https://id.raneddie.com/account" onClick={() => setOpen(false)}>Account Center <span>↗</span></a>
            <button type="button" onClick={() => signOut({ redirectUrl: "https://raneddie.com" })}>Sign out <span>↗</span></button>
          </div>
        </>
      )}
    </div>
  );
}

export default function AuthNav() {
  const enabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  if (!enabled) return <SignInLink />;
  return <ConnectedAccountMenu />;
}
