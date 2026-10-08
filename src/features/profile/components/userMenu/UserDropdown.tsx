"use client";

import { useState } from "react";

import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";

import UserMenuTrigger from "./UserMenuTrigger";
import UserMenuHeader from "./UserMenuHeader";
import UserMenuItems from "./UserMenuItems";
import type { AuthUser } from "@/src/types/auth.types";

interface IUserDropdownProps {
  user: AuthUser | null;
}

const UserDropdown = ({ user }: IUserDropdownProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) {
    return (
      <div
        className="flex items-center gap-3"
        aria-label="Loading user profile"
      >
        <div className="size-10 animate-pulse rounded-xl bg-card" />
        <div className="h-4 w-20 animate-pulse rounded bg-card" />
      </div>
    );
  }

  return (
    <Menu
      open={isMenuOpen}
      handler={setIsMenuOpen}
      placement="bottom-end"
      offset={12}
    >
      <MenuHandler>
        <UserMenuTrigger user={user} isOpen={isMenuOpen} />
      </MenuHandler>

      <MenuList
        className="w-75.5 max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl border border-raised bg-page p-0 font-archivo text-primary shadow-xl focus:outline-none"
        {...({} as any)}
      >
        <UserMenuHeader user={user} />

        <UserMenuItems onClose={() => setIsMenuOpen(false)} />
      </MenuList>
    </Menu>
  );
};

export default UserDropdown;
