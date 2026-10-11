"use client";

import { useState } from "react";
import cn from "classnames";

import { useTickets } from "../../hooks/useTickets";
import TicketListItem from "./TicketListItem";
import { Button } from "@/src/components/ui";
import type { TicketFilter } from "@/src/types/ticket.types";

const filters = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
] as const;

const TicketList = () => {
  const [activeFilter, setActiveFilter] = useState<TicketFilter>("upcoming");

  const {
    data: tickets = [],
    isPending,
    isError,
    refetch,
  } = useTickets(activeFilter);

  return (
    <ul className="flex flex-col gap-5">
      <div className="flex w-fit items-center gap-1 rounded-xl bg-card p-1">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setActiveFilter(value)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
              activeFilter === value
                ? "bg-raised text-primary"
                : "text-secondary hover:text-primary",
            )}
          >
            {label}
            {activeFilter === value && (
              <span className="text-xs">{tickets.length}</span>
            )}
          </button>
        ))}
      </div>

      {isPending ? (
        <div
          role="status"
          aria-label="Loading tickets"
          className="flex flex-col gap-5"
        >
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-45 animate-pulse rounded-3xl bg-card"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl bg-card p-8 text-center">
          <p className="text-sm text-primary">Unable to load your tickets.</p>

          <Button onClick={() => void refetch()} className="mt-4">
            Try again
          </Button>
        </div>
      ) : tickets.length === 0 ? (
        <div className="rounded-2xl bg-card p-10 text-center">
          <h3 className="text-base font-semibold text-primary">
            No {activeFilter} tickets
          </h3>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {tickets.map((order) => (
            <TicketListItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </ul>
  );
};

export default TicketList;
