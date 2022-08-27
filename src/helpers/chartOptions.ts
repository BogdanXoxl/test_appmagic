import type { RangeFilterType, DateFormat, ModDataType } from "../utils";

type OptionsType<T> = {
  value: T;
  label: string;
}[];

export const rangeOptions: OptionsType<RangeFilterType> = [
  { label: "All the time", value: "all" },
  { label: "Last year", value: "year" },
  { label: "Last month", value: "month" },
  { label: "Last day", value: "day" },
];

export const discretenessOptions: OptionsType<DateFormat> = [
  { label: "Hours", value: "hours" },
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
];

export const createChartConfig = (data: ModDataType) => ({
  data,
  xField: "date",
  yField: "price",
  xAxis: {
    tickCount: 7,
  },
  yAxis: {
    tickCount: 11,
    max: 1000,
  },
  limitInPlot: false,
  smooth: true,
  scrollbar: {},
  slider: {
    start: 0.1,
    end: 0.5,
    trendCfg: {
      lineStyle: {},
    },
  },
});
