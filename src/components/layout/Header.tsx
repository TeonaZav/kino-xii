"use client";

import Link from "next/link";
import cn from "classnames";

import useAuth from "@/src/features/auth/hooks/useAuth";
import { Logo, Button } from "@/src/components/ui";
import UserDropdown from "@/src/features/profile/components/userMenu/UserDropdown";

export default function Header() {
  const { isAuthenticated, isAuthLoading, user, openLogin, openSignUp } =
    useAuth();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full",
        "transition-colors duration-300",
        "bg-linear-to-b from-black via-black/51 to-transparent",
      )}
    >
      <div className="mx-auto flex h-27.75 w-full max-w-480 items-center justify-between px-4 md:px-10 xl:px-15">
        <div className="flex items-center gap-10">
          <Logo />

          <Link
            href="/sessions"
            className="text-xs leading-none font-semibold tracking-[0.06em] uppercase"
          >
            Sessions
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:block">search</div>

          {isAuthLoading ? (
            <div className="h-10 w-32 animate-pulse rounded-xl bg-card" />
          ) : isAuthenticated ? (
            user ? (
              <UserDropdown user={user} />
            ) : (
              <div
                className="h-10 w-32 rounded-xl bg-card"
                aria-label="User profile unavailable"
              />
            )
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="primary" onClick={openSignUp}>
                Sign up
              </Button>

              <Button variant="secondary" onClick={openLogin}>
                Log in
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
