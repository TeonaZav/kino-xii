import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import { Icon, IconType } from "@/src/components/ui/icons";

interface ICarouselNavigationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  label: string;
}

export default function CarouselNavigationButton({
  icon,
  label,
  className,
  ...props
}: ICarouselNavigationButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={classNames(
        "flex size-13.5 cursor-pointer items-center justify-center",
        "rounded-full border border-primary/5 bg-page/25",
        "text-primary transition-all duration-300",
        "hover:bg-page/50 hover:text-primary/70",
        className,
      )}
      {...props}
    >
      <Icon type={icon} />
    </button>
  );
}
