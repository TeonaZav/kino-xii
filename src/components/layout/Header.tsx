import Link from "next/link";

import Logo from "../ui/Logo";
import Button from "../ui/Button";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-b from-black via-black/[0.51] to-transparent">
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
