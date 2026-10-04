import Container from "@/src/components/layout/Container";

const HeroSkeleton = () => {
  return (
    <section className="relative h-[70svh] min-h-125 max-h-190 w-full overflow-hidden bg-page md:h-[65svh] lg:aspect-1728/760 lg:h-auto lg:min-h-0 lg:max-h-none">
      <div className="absolute inset-0 animate-pulse bg-raised" />

      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.3)_50%,transparent_100%)] lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.25)_50%,transparent_100%)]" />

      <Container className="relative z-10 h-full">
        <div className="mx-auto flex h-full w-full max-w-xl flex-col justify-end gap-4 pb-20 sm:gap-5 sm:pb-24 md:pb-28 lg:mx-0 lg:max-w-140 lg:gap-6 lg:pb-31.25">
          <div className="flex flex-col items-center gap-3 sm:gap-4 lg:items-start">
            <div className="h-6 w-36 animate-pulse rounded-full bg-white/15" />

            <div className="h-7 w-3/4 animate-pulse rounded bg-white/15 sm:h-8 lg:h-10" />

            <div className="flex items-center gap-2">
              <div className="h-6 w-10 animate-pulse rounded-full bg-white/15" />
              <div className="h-6 w-24 animate-pulse rounded-full bg-white/15" />
              <div className="h-6 w-12 animate-pulse rounded-full bg-white/15" />
            </div>

            <div className="flex w-full max-w-xl flex-col gap-2">
              <div className="h-3 w-full animate-pulse rounded bg-white/15" />
              <div className="h-3 w-[90%] animate-pulse rounded bg-white/15" />
              <div className="h-3 w-[65%] animate-pulse rounded bg-white/15" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 lg:justify-start">
            <div className="h-10 w-32 animate-pulse rounded-full bg-white/15" />
            <div className="h-10 w-28 animate-pulse rounded-full bg-white/15" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSkeleton;
