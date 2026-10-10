"use client";

import { useRouter } from "next/navigation";
import cn from "classnames";

import { Button, Icon } from "@/src/components/ui";

interface IBuyTicketButtonProps {
  className?: string;
  showIcon?: boolean;
  movieSlug?: string;
  onClick?: () => void;
}

const BuyTicketButton = ({
  className,
  showIcon = false,
  movieSlug,
  onClick,
}: IBuyTicketButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (movieSlug) {
      router.push(`/movies/${encodeURIComponent(movieSlug)}`);
    }
  };

  return (
    <Button variant="primary" className={cn(className)} onClick={handleClick}>
      {showIcon && <Icon type="Movie" className="size-4" />}
      Buy Ticket
    </Button>
  );
};

export default BuyTicketButton;
