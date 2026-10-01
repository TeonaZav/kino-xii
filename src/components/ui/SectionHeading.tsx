import { HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

interface ISectionHeading extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  subheading?: string;
  uppercase?: boolean;
}

export default function SectionHeading({
  children,
  subheading,
  className,
  ...props
}: ISectionHeading) {
  return (
    <div className="flex flex-col gap-1.5">
      <h3
        {...props}
        className={classNames("text-2xl text-primary font-semibold", className)}
      >
        {children}
      </h3>

      {subheading && <p className="text-sm text-secondary">{subheading}</p>}
    </div>
  );
}
