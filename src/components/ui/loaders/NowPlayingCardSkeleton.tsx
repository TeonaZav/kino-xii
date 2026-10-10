import cn from "classnames";

import { Card, Skeleton } from "@/src/components/ui";

const NowPlayingCardSkeleton = () => {
  return (
    <Card
      as="article"
      className={cn(
        "now-playing-card-size",
        "flex shrink-0 snap-start flex-col bg-card/20 p-3",
      )}
    >
      <Skeleton className="h-[66.37%] w-full shrink-0 rounded-[14px] bg-raised/10" />

      <div className="flex min-h-0 flex-1 flex-col gap-2 pt-3 pb-14">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-3/4 bg-raised/30" />

          <Skeleton className="h-3.5 w-1/2 bg-raised/30" />

          <Skeleton className="h-6 w-10 rounded-full bg-raised/30" />
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <Skeleton className="h-4 w-20 bg-raised/30" />

        <Skeleton className="h-9 w-24 rounded-full bg-raised/30" />
      </div>
    </Card>
  );
};

export default NowPlayingCardSkeleton;
