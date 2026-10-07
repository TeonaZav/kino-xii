"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import cn from "classnames";


import { Logo, Button } from "@/src/components/ui";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 w-full",
        "transition-colors duration-300",
        isScrolled
          ? "bg-linear-to-b from-page via-page/90 to-page/20"
          : "bg-linear-to-b from-black via-black/51 to-transparent",
      )}
    >
      <div className="mx-auto flex max-w-480 items-center justify-between px-15 pt-8 pb-10">
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

          <div className="flex items-center gap-3">
            <Button variant="primary">Sign up</Button>
            <Button variant="secondary">Log in</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
