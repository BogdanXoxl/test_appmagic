import moment from "moment";
import { ModDataType } from ".";

export type RangeFilterType = "day" | "month" | "year" | "all";

export const filterData = (data: ModDataType, range: RangeFilterType) => {
  if (range === "all") return data;

  const _data = data.filter((d) =>
    moment().isSameOrBefore(moment(d.date, ["YY-MM-DD", "YY-MM wo [week]"]), range)
  );

  return _data;
};
