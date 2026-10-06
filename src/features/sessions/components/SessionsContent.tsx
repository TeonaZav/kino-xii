"use client";

import { useSessionsData } from "../hooks/queries/useSessionsData";
import useSessionsFilters from "../hooks/useSessionsFilters";

import SessionList from "./sessionsList/SessionList";
import SessionsPagination from "./SessionsPagination";
import SessionsSort from "./filter/SessionsSort";
import { SessionsContentSkeleton } from "@/src/components/ui";

const SessionsContent = () => {
  const { filters, setPage } = useSessionsFilters();

  const { data, isLoading, isError } = useSessionsData(filters);

  if (isLoading) {
    return <SessionsContentSkeleton />;
  }

  if (isError || !data) {
    return null;
  }

  const { data: movies, meta } = data;

  return (
    <section className="min-w-0 flex-1">
      <SessionsSort totalSessions={meta.totalSessions} />

      <SessionList movies={movies} />

      {meta.lastPage > 1 && (
        <SessionsPagination
          currentPage={meta.currentPage}
          totalPages={meta.lastPage}
          onPageChange={setPage}
        />
      )}
    </section>
  );
};

export default SessionsContent;
