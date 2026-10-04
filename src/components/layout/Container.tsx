import classNames from "classnames";
import { ReactNode } from "react";

interface IContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: IContainerProps) {
  return (
    <div
      className={classNames(
        "mx-auto w-full max-w-480 px-5 xl:px-15",
        className,
      )}
    >
      {children}
    </div>
  );
}
