import cn from "classnames";

interface ISessionVenueProps {
  venueName: string;
  hallName: string;
  showLabel?: boolean;
  className?: string;
}

const SessionVenue = ({
  venueName,
  hallName,
  showLabel = false,
  className,
}: ISessionVenueProps) => {
  return (
    <div className={cn(className)}>
      {showLabel && (
        <p className="text-xs font-semibold uppercase text-secondary">Venue</p>
      )}

      <p className="font-semibold text-primary">
        {venueName} · Hall {hallName}
      </p>
    </div>
  );
};

export default SessionVenue;
