import cn from "classnames";

const legendItems = [
  { label: "Available", type: "available" },
  { label: "Selected", type: "selected" },
  { label: "Sold", type: "sold" },
  { label: "Held by another user", type: "held" },
] as const;

const SeatLegend = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
      {legendItems.map(({ label, type }) => (
        <div key={type} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn("size-4 shrink-0 rounded-sm", {
              "border border-disabled bg-card": type === "available",
              "bg-red": type === "selected",
              "bg-card": type === "sold",
              "seat-held": type === "held",
            })}
          />

          <span className="text-xs text-secondary">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default SeatLegend;
