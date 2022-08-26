import moment from "moment";
import _ from "lodash";

export type InDataType = {
  time: string;
  gasPrice: number;
  gasValue: number;
  average: number;
  maxGasPrice: number;
  medianGasPrice: number;
}[];

//by hour/day/week
export type DateFormat = "YY-MM-DD hh:mm" | "YY-MM-DD" | "YY-MM wo [week]";

//prepare data
const prepareData = (data: InDataType, dateFormat: DateFormat) =>
  data.map((d) => ({
    price: d.gasPrice,
    date: d.time,
    _date: moment(d.time, "YY-MM-DD hh:mm").format(dateFormat),
  }));

// group data by date
const groupData = (data: ReturnType<typeof prepareData>) =>
  _.groupBy(data, (d) => {
    return d._date;
  });

// get avarge price
const buildData = (data: any) => {
  let result: any = [];

  _.forEach(data, (val, key: number) => {
    let totalCounts = val.reduce((acc: any, curr: any) => {
      return acc + curr.price;
    }, 0);
    result.push({ date: key, price: totalCounts / val.length });
  });

  return result;
};

export const getData = (data: InDataType, dateFormat: DateFormat) => {
  let _data: any = prepareData(data, dateFormat);
  _data = groupData(_data);
  _data = buildData(_data);

  return _data;
};
