/** Format a number as Indian Rupees with thousands separators. */
export function formatInr(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  return (
    "₹" +
    rounded.toLocaleString("en-IN", {
      minimumFractionDigits: Number.isInteger(rounded) ? 0 : 2,
      maximumFractionDigits: 2,
    })
  );
}

/** Compact currency label, e.g. 12345 -> "₹12,345". */
export function formatNumber(value: number): string {
  return value.toLocaleString("en-IN");
}
