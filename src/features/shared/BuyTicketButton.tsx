import cn from "classnames";

import { Button, Icon } from "@/src/components/ui";

interface IBuyTicketButtonProps {
  className?: string;
  showIcon?: boolean;
  onClick?: () => void;
}

const BuyTicketButton = ({
  className,
  showIcon = false,
  onClick,
}: IBuyTicketButtonProps) => {
  return (
    // TODO: Implement buy ticket behavior.

    <Button variant="primary" className={cn(className)} onClick={onClick}>
      {showIcon && <Icon type="Movie" className="size-4" />}
      Buy Ticket
    </Button>
  );
};
export default BuyTicketButton;
