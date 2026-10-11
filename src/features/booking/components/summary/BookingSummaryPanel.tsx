import type { ReactNode } from "react";

interface IBookingSummaryPanelProps {
  children: ReactNode;
}

const BookingSummaryPanel = ({ children }: IBookingSummaryPanelProps) => {
  return (
    <aside className="flex h-full min-w-0 flex-col gap-4 overflow-y-auto border-raised lg:border-l lg:pl-5 w-85.25">
      {children}
    </aside>
  );
};

export default BookingSummaryPanel;
