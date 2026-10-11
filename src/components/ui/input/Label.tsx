import type { LabelHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

interface IInputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  hasError?: boolean;
}

const InputLabel = ({
  children,
  hasError = false,
  className,
  ...props
}: IInputLabelProps) => {
  return (
    <label
      {...props}
      className={cn(
        "text-xs font-semibold",
        hasError ? "text-error" : "text-primary",
        className,
      )}
    >
      {children}
    </label>
  );
};

export default InputLabel;
