"use client";

import { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { UserRound } from "lucide-react";

/** RanEddie ID lives on its own subdomain; every account action goes there. */
const RANEDDIE_ID_URL = "https://accounts.raneddie.com";
const SITE_URL = "https://raneddie.com";

function signInUrl(returnTo: string) {
  return `${RANEDDIE_ID_URL}/sign-in?redirect_url=${encodeURIComponent(returnTo)}`;
}

/**
 * A real link (works before JavaScript/Clerk loads, supports middle-click and long-press).
 * After mount it returns the player to the exact page they were on.
 */
function SignInLink() {
  const [href, setHref] = useState(() => signInUrl(`${SITE_URL}/`));
  useEffect(() => {
    setHref(signInUrl(window.location.href));
  }, []);
  return (
    <a href={href} className="navlink account-nav-signin" aria-label="Sign in with RanEddie ID">
      <UserRound size={16} aria-hidden />
      <span>Sign in</span>
    </a>
  );
}

function ConnectedAccountMenu() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Never block sign-in on Clerk: until it has loaded (or if it fails to load) show the plain link.
  if (!isLoaded || !isSignedIn || !user) return <SignInLink />;

  const display = user.username || user.firstName || "Account";
  const initial = (user.firstName || user.username || user.primaryEmailAddress?.emailAddress || "R").slice(0, 1).toUpperCase();

  return (
    <div className="raneddie-account-menu">
      <button
        className="raneddie-account-trigger"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`RanEddie ID menu for ${display}`}
      >
        <span className="raneddie-account-avatar">
          {user.hasImage ? <img src={user.imageUrl} alt="" /> : initial}
        </span>
        <span className="raneddie-account-name">{display}</span>
        <span className="raneddie-account-chevron" aria-hidden>⌄</span>
      </button>
      {open && (
        <>
          <button className="raneddie-account-dismiss" aria-label="Close account menu" onClick={() => setOpen(false)} />
          <div className="raneddie-account-dropdown" role="menu">
            <div className="raneddie-account-dropdown-user">
              <b>{user.fullName || user.username || "RanEddie member"}</b>
              <small>{user.primaryEmailAddress?.emailAddress}</small>
            </div>
            <a role="menuitem" href={`${RANEDDIE_ID_URL}/account`} onClick={() => setOpen(false)}>
              Account Center <span aria-hidden>↗</span>
            </a>
            <button
              role="menuitem"
              type="button"
              onClick={() => {
                setOpen(false);
                signOut({ redirectUrl: window.location.origin });
              }}
            >
              Sign out <span aria-hidden>↗</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function AuthNav() {
  // Without a Clerk key (local dev / preview) the button still sends players to RanEddie ID.
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) return <SignInLink />;
  return <ConnectedAccountMenu />;
}
