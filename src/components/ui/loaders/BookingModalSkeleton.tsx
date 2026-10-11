import { Skeleton } from "@/src/components/ui";

const BookingModalSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-1 flex-col gap-3">
          <Skeleton className="h-7 w-48 rounded-md" />
          <Skeleton className="h-4 w-full max-w-100 rounded-md" />
        </div>

        <Skeleton className="size-9 shrink-0 rounded-full" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_341px]">

        <div className="flex min-w-0 flex-col gap-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-28 rounded-lg" />
            <Skeleton className="h-0.5 flex-1" />
            <Skeleton className="h-9 w-28 rounded-lg" />
          </div>

          <div className="flex flex-col gap-6 rounded-2xl bg-card p-5">
            <Skeleton className="mx-auto h-4 w-32 rounded-md" />
            <Skeleton className="h-2 w-full rounded-full" />

            <div className="flex flex-col items-center gap-3 overflow-hidden py-4">
              {Array.from({ length: 5 }).map((_, row) => (
                <div key={row} className="flex justify-center gap-3">
                  {Array.from({ length: 7 }).map((_, seat) => (
                    <Skeleton
                      key={seat}
                      className="size-10 shrink-0 rounded-[10px] sm:size-13"
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded" />
                  <Skeleton className="h-3 w-14 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-col gap-5 rounded-2xl bg-card p-5">
            <Skeleton className="h-6 w-40 rounded-md" />

            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4"
                >
                  <Skeleton className="h-4 w-20 rounded-md" />
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
              ))}
            </div>

            <div className="border-t border-raised pt-5">
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-5 w-16 rounded-md" />
                <Skeleton className="h-6 w-24 rounded-md" />
              </div>
            </div>

            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModalSkeleton;
