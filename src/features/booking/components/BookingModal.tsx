"use client";

import { useState } from "react";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import type { Movie } from "@/src/types/movie.types";
import type { Session } from "@/src/types/session.types";

import { Modal } from "@/src/components/ui";

type BookingStep = "seats" | "checkout";

interface IBookingModalProps {
  movie: Movie;
  session: Session;
  onClose: () => void;
}

const bookingSteps = [
  {
    label: "1. Seats",
    value: "seats",
  },
  {
    label: "2. Checkout",
    value: "checkout",
  },
] as const;

const BookingModal = ({ movie, session, onClose }: IBookingModalProps) => {
  const [activeStep, setActiveStep] = useState<BookingStep>("seats");

  return (
    <Modal
      open
      onClose={onClose}
      outsidePress
      className="max-w-286.5!"
      contentClassName="p-6!"
    >
      <div className="flex w-full flex-col gap-6">
        <Tabs value={activeStep}>
          <TabsHeader
            className="rounded-full bg-card p-1"
            indicatorProps={{
              className: "rounded-full bg-red shadow-none",
            }}
            {...({} as any)}
          >
            {bookingSteps.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                disabled={value === "checkout"}
                onClick={() => setActiveStep(value)}
                className="py-2 text-xs font-semibold text-primary"
                {...({} as any)}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>

          <TabsBody {...({} as any)}>
            <TabPanel value="seats" className="px-0 py-6 text-primary">
              <p className="text-sm text-secondary">
                {/* TODO Seat selection will be implemented here. */}
              </p>
            </TabPanel>

            <TabPanel value="checkout" className="px-0 py-6 text-primary">
              <div className="flex min-h-80 items-center justify-center rounded-xl bg-card">
                <p className="text-sm text-secondary">
                  {/* TODO Checkout will be implemented here. */}
                </p>
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </Modal>
  );
};

export default BookingModal;
