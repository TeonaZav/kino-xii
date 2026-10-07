import type { ReactNode } from "react";
import cn from "classnames";

interface IFilterSectionProps {
  title: string;
  children: ReactNode;
}

const FilterSection = ({ title, children }: IFilterSectionProps) => {
  return (
    <div className={cn("py-6 first:pt-0 border-b border-raised")}>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary leading-[100%]">
        {title}
      </h4>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
};

export default FilterSection;
