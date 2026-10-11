export const formatPrice = (price: number): string =>
  Number.isFinite(price)
    ? price.toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })
    : "0";
