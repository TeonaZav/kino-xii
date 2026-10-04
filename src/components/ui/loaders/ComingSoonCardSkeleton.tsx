import { Card } from "@/src/components/ui";

const ComingSoonCardSkeleton = () => {
  return (
    <Card
      as="article"
      className="coming-soon-card-size flex shrink-0 snap-start gap-3.75 p-3"
    >
      <div className="h-full w-[48.72%] shrink-0 animate-pulse rounded-[14px] bg-raised" />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-2 h-3 w-28 animate-pulse rounded bg-raised" />

        <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-raised" />

        <div className="mb-2 h-3 w-24 animate-pulse rounded bg-raised" />

        <div className="h-6 w-10 animate-pulse rounded-full bg-raised" />

        <div className="mt-auto h-9 w-24 animate-pulse rounded-full bg-raised" />
      </div>
    </Card>
  );
};

export default ComingSoonCardSkeleton;
