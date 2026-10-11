interface IHoldCountdownProps {
  remainingSeconds: number;
}

const HoldTimer = ({ remainingSeconds }: IHoldCountdownProps) => {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return (
    <div
      role="timer"
      className="flex w-fit flex-col items-center rounded-xl bg-card px-4 py-2"
    >
      <span className="text-xs font-semibold text-secondary upeprcase leading-[100%]">
        SEATS HELD
      </span>

      <span className="text-sm font-extrabold tabular-nums">
        {minutes}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
};

export default HoldTimer;
