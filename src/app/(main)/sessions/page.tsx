import Container from "@/src/components/layout/Container";
import { SectionHeading } from "@/src/components/ui";
import SessionsFilters from "@/src/features/sessions/components/filter/SessionsFilters";
import SessionsContent from "@/src/features/sessions/components/SessionsContent";

export default function SessionsPage() {
  return (
    <Container className="py-8">
      <SectionHeading subheading="Browse showtimes across all venues">
        Sessions
      </SectionHeading>

      <div className="mt-8 flex items-start gap-8">
        <aside className="w-80 shrink-0 lg:block">
          <SessionsFilters />
        </aside>

        <main className="min-w-0 flex-1">
          <SessionsContent />
        </main>
      </div>
    </Container>
  );
}
