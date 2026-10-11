import type { ReactNode } from "react";
import cn from "classnames";

interface IInfoFieldProps {
  label: string;
  value: ReactNode;
  className?: string;
}

const InfoField = ({ label, value, className }: IInfoFieldProps) => (
  <div className={cn("flex flex-col gap-1", className)}>
    <span className="text-xs font-semibold uppercase text-secondary">
      {label}
    </span>

    <span className="text-xs font-semibold text-primary">{value}</span>
  </div>
);

export default InfoField;
