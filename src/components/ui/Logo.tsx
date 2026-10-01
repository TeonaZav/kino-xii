import Link from "next/link";
import classNames from "classnames";

type LogoSize = "sm" | "lg";

type LogoProps = {
  size?: LogoSize;
  className?: string;
};

const sizeClasses: Record<LogoSize, string> = {
  sm: "text-sm",
  lg: "text-xl",
};

export default function Logo({ size = "lg", className }: LogoProps) {
  return (
    <Link
      href="/"
      className={classNames("font-bold", sizeClasses[size], className)}
    >
      KINO <span className="text-red">XII</span>
    </Link>
  );
}
