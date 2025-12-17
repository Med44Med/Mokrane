export function Price(value: string) {
  const currencyFormatter = new Intl.NumberFormat("ar-AR", {
    style: "currency",
    currency: "DZD",
  });
  return currencyFormatter.format(value);
}
