"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

/** Auth-aware nav actions shown when Clerk is configured. */
export function UserNav({ isAdmin }: { isAdmin: boolean }) {
  return (
    <>
      <SignedOut>
        <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild size="sm" variant="accent">
          <Link href="/sign-up">Register</Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        {isAdmin && (
          <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
            <Link href="/admin">Admin</Link>
          </Button>
        )}
        <UserButton
          appearance={{ elements: { avatarBox: "h-8 w-8" } }}
          afterSignOutUrl="/"
        />
      </SignedIn>
    </>
  );
}
