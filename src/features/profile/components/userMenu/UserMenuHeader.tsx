import { Icon, StatusBanner } from "@/src/components/ui";

import UserAvatar from "./UserAvatar";
import type { AuthUser } from "@/src/types/auth.types";

interface IUserMenuHeaderProps {
  user: AuthUser;
}

const UserMenuHeader = ({ user }: IUserMenuHeaderProps) => {
  const displayName = user.fullName?.trim() || user.username;
  const isProfileComplete = user.profileComplete;

  return (
    <>
      <div className="flex items-center gap-2.5 px-5 pt-5">
        <UserAvatar user={user} size="lg" />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-primary">
            {displayName}
          </p>

          <p className="truncate text-xs text-secondary">{user.email}</p>
        </div>
      </div>

      <StatusBanner
        variant={isProfileComplete ? "success" : "warning"}
        title={isProfileComplete ? "Profile Complete" : "Profile incomplete"}
        description={
          !isProfileComplete
            ? "Please complete your profile to enable booking"
            : undefined
        }
        icon={
          isProfileComplete ? (
            <Icon type="Check" className="size-4" />
          ) : undefined
        }
        className="mx-5 mt-3 mb-1"
      />
    </>
  );
};

export default UserMenuHeader;
