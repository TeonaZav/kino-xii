import cn from "classnames";

import type { Session } from "@/src/types/session.types";

import { Badge } from "@/src/components/ui";
import { SessionAvailability } from "@/src/features/shared";

interface ISessionTimeCardProps {
  session: Session;
  onSelect: (session: Session) => void;
}

const SessionTimeCard = ({ session, onSelect }: ISessionTimeCardProps) => {
  const { time, language, format, price, seatsLeft, isSoldOut } = session;

  return (
    <button
      type="button"
      disabled={isSoldOut}
      onClick={() => onSelect(session)}
      className={cn(
        "relative flex w-full overflow-hidden rounded-xl bg-page text-left",
        "transition-colors enabled:cursor-pointer enabled:hover:bg-page/80",
        "disabled:cursor-not-allowed disabled:opacity-40",
      )}
    >
      <div className="flex min-h-20.25 min-w-31 flex-col items-center justify-center gap-2 px-5 py-3.75 flex-1">
        <span className="text-xl leading-[100%] font-extrabold">{time}</span>

        <div className="flex items-center gap-1.5 text-xs text-secondary">
          <span className="leading-[130%]">{language.code}</span>

          <Badge className="py-1! text-secondary uppercase">
            {format.name}
          </Badge>
        </div>
      </div>

      <div className="relative w-px shrink-0 border-l border-dashed border-primary/80">
        <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-card" />
        <span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-card" />
      </div>

      <div className="flex min-w-20.75 shrink-0 flex-col items-center justify-center gap-2 px-2 py-2">
        <span className="text-base font-extrabold text-red">₾ {price}</span>

        <SessionAvailability isSoldOut={isSoldOut} seatsLeft={seatsLeft} />
      </div>
    </button>
  );
};

export default SessionTimeCard;
