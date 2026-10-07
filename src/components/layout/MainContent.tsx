"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";

interface IMainContentProps {
  children: ReactNode;
}

const MainContent = ({ children }: IMainContentProps) => {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <main
      className={cn(
        "min-w-0 flex-1",
        !isHomePage && "pt-27.75",
      )}
    >
      {children}
    </main>
  );
};

export default MainContent;