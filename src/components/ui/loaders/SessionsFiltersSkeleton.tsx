import { Card, Skeleton } from "@/src/components/ui";

const SessionsFiltersSkeleton = () => {
  return (
    <Card className="flex w-full flex-col p-6">
      <Skeleton className="h-5 w-16" />

      <div className="border-b border-raised py-6">
        <Skeleton className="mb-4 h-3 w-12" />

        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="size-4 shrink-0" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-raised py-6">
        <Skeleton className="mb-4 h-3 w-10" />

        <div className="flex gap-1.5 overflow-hidden">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-16 w-10 shrink-0" />
          ))}
        </div>
      </div>

      <div className="border-b border-raised py-6">
        <Skeleton className="mb-4 h-3 w-14" />

        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="size-4 shrink-0" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-raised py-6">
        <Skeleton className="mb-4 h-3 w-16" />

        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="size-4 shrink-0" />
              <Skeleton className="h-3 w-28" />
            </div>
          ))}
        </div>
      </div>

      <div className="py-6">
        <Skeleton className="mb-4 h-3 w-20" />

        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="size-4 shrink-0" />
              <Skeleton className="h-3 w-36" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <Skeleton className="h-3 w-20" />
      </div>
    </Card>
  );
};

export default SessionsFiltersSkeleton;
