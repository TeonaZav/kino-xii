"use client";

import { useSearchParams } from "next/navigation";

import { useTickets } from "../hooks/useTickets";
import { useProfile } from "../hooks/useProfile";
import { useSessionFilterOptionsData } from "../../sessions/hooks/queries/useSessionFilterOptionsData";

import Container from "@/src/components/layout/Container";
import { PersonalInformationSkeleton } from "@/src/components/ui";

import ProfileTabs, { type ProfileTab } from "./ProfileTabs";
import PersonalInformation from "./PersonalInformation";
import TicketList from "./tickets/TicketList";

const ProfilePageContent = () => {
  const searchParams = useSearchParams();

  const activeTab: ProfileTab =
    searchParams.get("tab") === "tickets" ? "tickets" : "personal";
  const { data: upcomingTickets = [] } = useTickets("upcoming");

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    refetch,
  } = useProfile();

  const { data: filterOptions } = useSessionFilterOptionsData();

  const venues = filterOptions?.venues ?? [];

  return (
    <Container className="min-h-[70vh] pb-10 pt-27.75">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-primary">My Profile</h1>

        <ProfileTabs
          activeTab={activeTab}
          ticketsCount={upcomingTickets.length}
        />

        {activeTab === "tickets" ? (
          <div
            id="profile-panel-tickets"
            role="tabpanel"
            aria-labelledby="profile-tab-tickets"
            className="pt-4"
          >
            <TicketList />
          </div>
        ) : isProfileLoading ? (
          <PersonalInformationSkeleton />
        ) : isProfileError || !profile ? (
          <div className="flex flex-col items-start gap-4">
            <p className="text-secondary">Unable to load your profile.</p>

            <button
              type="button"
              onClick={() => void refetch()}
              className="rounded-xl bg-red px-6 py-3 text-white"
            >
              Try again
            </button>
          </div>
        ) : (
          <div
            id="profile-panel-personal"
            role="tabpanel"
            aria-labelledby="profile-tab-personal"
            className="pt-4"
          >
            <PersonalInformation profile={profile} venues={venues} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default ProfilePageContent;
