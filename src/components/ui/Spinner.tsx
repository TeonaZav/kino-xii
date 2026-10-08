import cn from "classnames";
import { ImSpinner2 } from "react-icons/im";

interface ISpinnerProps {
  className?: string;
}

const Spinner = ({ className }: ISpinnerProps) => {
  return (
    <ImSpinner2
      className={cn("size-4 animate-spin", className)}
      aria-hidden="true"
    />
  );
};

export default Spinner;
