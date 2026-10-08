"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";

import cn from "classnames";

import { Icon } from "@/src/components/ui";

import UserAvatar from "./UserAvatar";
import type { AuthUser } from "@/src/types/auth.types";

interface IUserMenuTriggerProps extends Omit<
  ComponentPropsWithRef<"button">,
  "ref"
> {
  user: AuthUser;
  isOpen: boolean;
}

const UserMenuTrigger = forwardRef<HTMLButtonElement, IUserMenuTriggerProps>(
  ({ user, isOpen, className, ...props }, ref) => {
    const displayName = user.fullName?.trim() || user.username;

    return (
      <button
        {...props}
        ref={ref}
        type="button"
        aria-label="Open profile menu"
        aria-expanded={isOpen}
        className={cn(
          "flex cursor-pointer items-center gap-3 text-primary",
          className,
        )}
      >
        <UserAvatar user={user} size="sm" />

        <span className="max-w-28 truncate text-sm font-semibold">
          {displayName}
        </span>

        <Icon
          type="ChevronDown"
          className={cn(
            "size-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
    );
  },
);

export default UserMenuTrigger;
