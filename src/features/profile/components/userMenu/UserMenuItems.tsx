"use client";

import { useRouter } from "next/navigation";
import { MenuItem } from "@material-tailwind/react";

import useAuthMutations from "@/src/features/auth/hooks/useAuthMutations";
import { Icon } from "@/src/components/ui";
import { USER_MENU_ITEMS } from "@/src/lib/constants/profile";

interface UserMenuItemsProps {
  onClose: () => void;
}

const UserMenuItems = ({ onClose }: UserMenuItemsProps) => {
  const router = useRouter();

  const { mutations, loading } = useAuthMutations();

  const handleNavigation = (href: string) => {
    if (loading.logout) return;

    onClose();
    router.push(href);
  };

  const handleLogout = () => {
    if (loading.logout) return;

    mutations.logout();
  };

  return (
    <>
      {USER_MENU_ITEMS?.map(({ label, href, icon }) => (
        <MenuItem
          key={href}
          onClick={() => handleNavigation(href)}
          disabled={loading.logout}
          className="flex items-center gap-3 rounded-none px-5 py-3 text-primary hover:bg-card"
          {...({} as any)}
        >
          <Icon type={icon} className="size-4" />

          <span className="text-sm leading-[100%] font-semibold">{label}</span>
        </MenuItem>
      ))}

      <div className="border-t border-raised px-5 hover:bg-card">
        <MenuItem
          onClick={handleLogout}
          disabled={loading.logout}
          className="flex items-center gap-3 rounded-lg px-0 py-3 text-red"
          {...({} as any)}
        >
          <Icon type="Logout" className="size-4" />

          <span className="text-sm font-semibold">
            {loading.logout ? "Logging out..." : "Log out"}
          </span>
        </MenuItem>
      </div>
    </>
  );
};

export default UserMenuItems;
