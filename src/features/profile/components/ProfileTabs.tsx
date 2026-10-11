"use client";

import { useRouter } from "next/navigation";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import cn from "classnames";

export type ProfileTab = "personal" | "tickets";

interface IProfileTabsProps {
  activeTab: ProfileTab;
  ticketsCount?: number;
}

const tabs = [
  { value: "personal", label: "Personal Information" },
  { value: "tickets", label: "My Tickets" },
] as const;

const ProfileTabs = ({ activeTab, ticketsCount = 0 }: IProfileTabsProps) => {
  const router = useRouter();

  return (
    <div className="w-full border-b border-raised">
      <Tabs value={activeTab}>
        <TabsHeader
          className="w-fit gap-8 rounded-none bg-transparent p-0"
          indicatorProps={{
            className:
              "rounded-none border-b-2 border-red bg-transparent shadow-none",
          }}
          {...({} as any)}
        >
          {tabs.map(({ value, label }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => router.push(`/profile?tab=${value}`)}
              className={cn(
                "w-auto px-0 py-4 text-sm font-medium whitespace-nowrap",
                activeTab === value
                  ? "text-primary"
                  : "text-secondary hover:text-primary",
              )}
              {...({} as any)}
            >
              <div className="flex items-center gap-2">
                {label}

                {value === "tickets" && ticketsCount > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-red text-[10px] font-semibold text-white">
                    {ticketsCount}
                  </span>
                )}
              </div>
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
