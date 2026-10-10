import { Card, Skeleton } from "@/src/components/ui";

const ComingSoonCardSkeleton = () => {
  return (
    <Card
      as="article"
      className="coming-soon-card-size flex shrink-0 snap-start gap-3.75 bg-card/20 p-3"
    >
      <Skeleton className="h-full w-[48.72%] shrink-0 rounded-[14px] bg-raised/30" />

      <div className="flex min-w-0 flex-1 flex-col">
        <Skeleton className="mb-2 h-3 w-28 bg-raised/30" />

        <Skeleton className="mb-2 h-4 w-3/4 bg-raised/30" />

        <Skeleton className="mb-2 h-3 w-24 bg-raised/30" />

        <Skeleton className="h-6 w-10 rounded-full bg-raised/30" />

        <Skeleton className="mt-auto h-9 w-24 rounded-full bg-raised/30" />
      </div>
    </Card>
  );
};

export default ComingSoonCardSkeleton;
