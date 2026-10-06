import cn from "classnames";

interface ISessionDateButtonProps {
  day: string;
  date: number;
  value: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
  className?: string;
}

const SessionDateButton = ({
  day,
  date,
  value,
  isSelected,
  onSelect,
  className = "",
}: ISessionDateButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        "flex h-13.5 w-full gap-1.5 cursor-pointer flex-col items-center justify-center tracking-tight shadow-button rounded-lg text-xs font-semibold transition-colors leading-2",
        isSelected
          ? "bg-red text-primary"
          : "bg-raised text-primary hover:bg-disabled",
        className,
      )}
    >
      <span>{day}</span>
      <span>{date}</span>
    </button>
  );
};

export default SessionDateButton;
