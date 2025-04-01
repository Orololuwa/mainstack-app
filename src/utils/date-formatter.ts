import { format } from "date-fns";

export const formatISODate = (
  isoDate: string,
  dateFormat: string = "yyyy-MM-dd"
) => {
  return format(new Date(isoDate), dateFormat);
};
