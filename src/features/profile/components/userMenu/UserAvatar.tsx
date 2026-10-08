"use client";

import { Avatar, Badge } from "@material-tailwind/react";
import cn from "classnames";

import type { AuthUser } from "@/src/types/auth.types";

interface IUserAvatarProps {
  user: AuthUser;
  size?: "sm" | "lg";
}

const UserAvatar = ({ user, size = "sm" }: IUserAvatarProps) => {
  const displayName = user.fullName?.trim() || user.username;

  const initials = displayName
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={cn("relative shrink-0")}>
      {user.avatar ? (
        <Badge
          placement="bottom-end"
          className={cn(
            "min-w-2 min-h-2",
            user.profileComplete ? "bg-success" : "bg-warning",
          )}
        >
          <Avatar
            size="sm"
            src={user.avatar}
            alt={displayName}
            variant="rounded"
            className="w-10 h-10"
            {...({} as any)}
          />
        </Badge>
      ) : (
        <div
          className={cn("flex items-center justify-center rounded-xl bg-card")}
        >
          <span className="text-sm font-semibold text-primary">{initials}</span>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
