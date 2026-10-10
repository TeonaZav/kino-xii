import cn from "classnames";

type SessionDateButtonVariant = "sm" | "lg";

interface ISessionDateButtonProps {
  day: string;
  date: number;
  value: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
  variant?: SessionDateButtonVariant;
  className?: string;
}

const SessionDateButton = ({
  day,
  date,
  value,
  isSelected,
  onSelect,
  variant = "sm",
  className,
}: ISessionDateButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={isSelected}
      className={cn(
        "flex w-full cursor-pointer flex-col items-center justify-center gap-1 tracking-tight shadow-button transition-colors",
        isSelected
          ? "bg-red text-primary"
          : "bg-raised text-primary hover:bg-disabled",
        {
          "h-13.5 rounded-lg text-xs": variant === "sm",
          "h-20 rounded-2xl text-lg": variant === "lg",
        },
        className,
      )}
    >
      <span className="text-xs leading-[100%] font-semibold">{day}</span>

      <span
        className={cn("leading-[100%]", {
          "text-xs font-semibold": variant === "sm",
          "text-lg font-extrabold": variant === "lg",
        })}
      >
        {date}
      </span>
    </button>
  );
};
export default SessionDateButton;
