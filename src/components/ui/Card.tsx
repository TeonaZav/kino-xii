import { ComponentPropsWithoutRef, ElementType } from "react";
import cn from "classnames";

interface ICardProps<T extends ElementType = "div"> {
  as?: T;
  className?: string;
}

const Card = <T extends ElementType = "div">({
  as,
  className,
  ...props
}: ICardProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ICardProps<T>>) => {
  const Component = as || "div";

  return (
    <Component
      className={cn(
        "overflow-hidden rounded-[20px] bg-card",
        "shadow-[0_1px_4px_rgba(0,0,0,0.2)]",
        className,
      )}
      {...props}
    />
  );
};

export default Card;
