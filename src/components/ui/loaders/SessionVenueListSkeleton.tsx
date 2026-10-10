import { Skeleton } from "@/src/components/ui";

const SessionVenueListSkeleton = () => {
  return (
    <ul
      className="flex flex-col gap-6"
      aria-label="Loading movie sessions"
      aria-busy="true"
    >
      {Array.from({ length: 2 }).map((_, venueIndex) => (
        <li key={venueIndex} className="flex flex-col gap-3">
          <Skeleton className="h-4 w-36 rounded-md" />

          <div className="flex flex-wrap gap-2">
            {Array.from({ length: venueIndex === 0 ? 2 : 1 }).map(
              (_, hallIndex) => (
                <div
                  key={hallIndex}
                  className="flex flex-col gap-3 rounded-2xl bg-card p-3.75"
                >
                  <Skeleton className="h-3 w-16 rounded-sm" />

                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 2 }).map((_, sessionIndex) => (
                      <div
                        key={sessionIndex}
                        className="flex h-20.25 w-53 items-center gap-3 rounded-xl bg-page px-4"
                      >
                        <div className="flex flex-1 flex-col items-center gap-2">
                          <Skeleton className="h-5 w-14 rounded-md" />
                          <Skeleton className="h-3 w-12 rounded-sm" />
                        </div>

                        <div className="h-12 border-l border-dashed border-primary/20" />

                        <div className="flex flex-col items-center gap-2">
                          <Skeleton className="h-4 w-12 rounded-md" />
                          <Skeleton className="h-3 w-14 rounded-sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SessionVenueListSkeleton;
