import { Card } from "@/src/components/ui";

const NowPlayingCardSkeleton = () => {
  return (
    <Card
      as="article"
      className="now-playing-card-size flex shrink-0 snap-start flex-col p-3"
    >
      <div className="h-[66.37%] w-full shrink-0 animate-pulse rounded-[14px] bg-raised" />

      <div className="flex min-h-0 flex-1 flex-col gap-2 pt-3 pb-14">
        <div className="flex flex-col gap-2">
          <div className="h-5 w-3/4 animate-pulse rounded bg-raised" />

          <div className="h-3.5 w-1/2 animate-pulse rounded bg-raised" />

          <div className="h-6 w-10 animate-pulse rounded-full bg-raised" />
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="h-4 w-20 animate-pulse rounded bg-raised" />

        <div className="h-9 w-24 animate-pulse rounded-full bg-raised" />
      </div>
    </Card>
  );
};

export default NowPlayingCardSkeleton;
