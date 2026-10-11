export type CreateOrderPayload = {
  holdId: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

export type PaidOrder = {
  id: number;
  reference: string;
  status: string;
  totalPrice: number;
  paidAt: string;
  refundedAt: string | null;
  isUpcoming: boolean;
  isRefundable: boolean;
  cardLastFour: string;
  contact: {
    fullName: string;
    email: string;
    mobileNumber: string;
  };
  session: {
    id: number;
    startsAt: string;
    date: string;
    time: string;
    hall: { id: number; name: string };
    venue: { id: number; name: string };
    movie: {
      id: number;
      title: string;
      posterUrl: string;
    };
  };
  tickets: {
    id: number;
    seatCode: string;
    ticketType: {
      slug: string;
      name: string;
    };
    price: number;
  }[];
};
