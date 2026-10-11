"use client";

import { useRouter } from "next/navigation";
import cn from "classnames";

import useAuth from "@/src/features/auth/hooks/useAuth";

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
  const { requireAuth, isAuthLoading } = useAuth();

  const handleClick = () => {
    requireAuth(() => {
      if (onClick) {
        onClick();
        return;
      }

      if (movieSlug) {
        router.push(`/movies/${encodeURIComponent(movieSlug)}`);
      }
    });
  };

  return (
    <Button
      variant="primary"
      className={cn(className)}
      onClick={handleClick}
      disabled={isAuthLoading}
    >
      {showIcon && <Icon type="Movie" className="size-4" />}
      Buy Ticket
    </Button>
  );
};

export default BuyTicketButton;
