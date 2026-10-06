"use client";

import { useSessionFilterOptionsData } from "../../hooks/queries/useSessionFilterOptionsData";
import useSessionsFilters from "../../hooks/useSessionsFilters";

interface ISessionsSortProps {
  totalSessions: number;
}

const SessionsSort = ({ totalSessions }: ISessionsSortProps) => {
  const { data: filterOptions } = useSessionFilterOptionsData();

  const { filters, setSort } = useSessionsFilters();

  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <p className="text-sm font-semibold text-primary">
        {totalSessions
          ? `Showing ${totalSessions} sessions`
          : "No sessions found"}
      </p>

      {filterOptions && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-secondary">Sort:</span>

          <select
            value={filters.sort ?? "time_asc"}
            onChange={(event) =>
              setSort(event.target.value as NonNullable<typeof filters.sort>)
            }
            className="cursor-pointer bg-transparent text-sm font-semibold text-primary outline-none"
          >
            {filterOptions.sorts.map((sort) => (
              <option key={sort.id} value={sort.id} className="bg-card">
                {sort.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SessionsSort;
