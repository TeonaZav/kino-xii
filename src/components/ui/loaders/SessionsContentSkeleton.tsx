import { Card, Skeleton } from "@/src/components/ui";

const SessionsContentSkeleton = () => {
  return (
    <section className="min-w-0 flex-1">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="mt-8 flex flex-col gap-8">
        {Array.from({ length: 3 }).map((_, movieIndex) => (
          <div key={movieIndex}>
            <div className="mb-4 flex items-center gap-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-5 w-10" />
            </div>

            <div className="flex gap-3 overflow-hidden">
              {Array.from({ length: 4 }).map((_, sessionIndex) => (
                <Card
                  key={sessionIndex}
                  className="session-card-size flex shrink-0 flex-col justify-between rounded-2xl p-3.75 bg-card/50"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <Skeleton className="h-5 w-12" />
                      <Skeleton className="h-5 w-12" />
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SessionsContentSkeleton;
