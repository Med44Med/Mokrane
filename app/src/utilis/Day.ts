import dayjs from "dayjs";
import "dayjs/locale/ar";

dayjs.locale("ar");

export function Day(dateString: string): string {
  const date = dayjs(dateString);
  return date.format("D MMMM YYYY");
}
