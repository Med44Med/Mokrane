export function Price(value: string | number): string {
  const currencyFormatter = new Intl.NumberFormat("ar-AR", {
    style: "currency",
    currency: "DZD",
  });
  return currencyFormatter.format(typeof value === "string" ? parseFloat(value) : value);
}
