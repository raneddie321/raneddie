"use client";

import { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";

/** RanEddie ID lives on its own subdomain; the website only links to it. */
const ID_ORIGIN = "https://accounts.raneddie.com";
const SITE_ORIGIN = "https://raneddie.com";

function SignInLink() {
  // Sends the visitor to RanEddie ID, which brings them back to this exact page after signing in.
  function openSignIn() {
    const returnTo = typeof window !== "undefined" ? window.location.href : SITE_ORIGIN;
    window.location.href = `${ID_ORIGIN}/sign-in?redirect_url=${encodeURIComponent(returnTo)}`;
  }
  return <button type="button" className="navlink account-nav-signin" onClick={openSignIn}>Sign in <span aria-hidden>↗</span></button>;
}

function ConnectedAccountMenu() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);

  // Escape closes the account menu
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Keep authentication accessible if Clerk is slow to initialize.
  // Once Clerk loads, a signed-in user is automatically shown their account menu.
  if (!isLoaded) return <SignInLink />;
  if (!isSignedIn || !user) return <SignInLink />;

  return (
    <div className="raneddie-account-menu">
      <button className="raneddie-account-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="menu" aria-label="Account menu">
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
            <a href={`${ID_ORIGIN}/account`} onClick={() => setOpen(false)}>Account Center <span aria-hidden>↗</span></a>
            <button type="button" onClick={() => signOut({ redirectUrl: SITE_ORIGIN })}>Sign out <span aria-hidden>↗</span></button>
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
