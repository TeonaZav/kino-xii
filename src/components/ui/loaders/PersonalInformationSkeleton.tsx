const PersonalInformationSkeleton = () => {
  return (
    <div
      role="status"
      aria-label="Loading personal information"
      className="flex w-full max-w-210 animate-pulse flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <div className="h-3 w-20 rounded bg-raised" />
        <div className="h-12 w-full rounded-xl bg-card" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-3 w-12 rounded bg-raised" />
        <div className="h-12 w-full rounded-xl bg-card" />
        <div className="h-3 w-64 max-w-full rounded bg-raised" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-3 w-28 rounded bg-raised" />
        <div className="h-12 w-full rounded-xl bg-card" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-3 w-24 rounded bg-raised" />
        <div className="h-12 w-full rounded-xl bg-card" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-3 w-44 rounded bg-raised" />
        <div className="h-12 w-full rounded-xl bg-card" />
      </div>

      <div className="pt-3">
        <div className="h-12 w-45 rounded-full bg-raised" />
      </div>

      <span className="sr-only">Loading profile...</span>
    </div>
  );
};

export default PersonalInformationSkeleton;
