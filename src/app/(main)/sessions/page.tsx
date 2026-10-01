import Pagination from "@/src/components/ui/Pagination";
import SessionsFilters from "@/src/features/sessions/components/SessionsFilters";
import SessionsHeader from "@/src/features/sessions/components/SessionsHeader";
import SessionsList from "@/src/features/sessions/components/SessionsList";
import SessionsSort from "@/src/features/sessions/components/SessionsSort";

export default function Page() {
  return (
    <>
      <SessionsHeader />

      <div className="grid grid-cols-[...]">
        <SessionsFilters />

        <main>
          <SessionsSort />
          <SessionsList />
          <Pagination />
        </main>
      </div>
    </>
  );
}
