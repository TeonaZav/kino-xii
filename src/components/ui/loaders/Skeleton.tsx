import type { HTMLAttributes } from "react";

import { twMerge } from "tailwind-merge";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      {...props}
      aria-hidden="true"
      className={twMerge("animate-pulse rounded-md bg-raised/30", className)}
    />
  );
};

export default Skeleton;
