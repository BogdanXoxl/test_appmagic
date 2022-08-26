import React, { useMemo } from "react";
import { Line } from "@ant-design/plots";
import { Col, Row, Form, Select } from "antd";

import { DateFormat, getData } from "./utils/getData";
import mocs from "./data/mocs.json";

const { Option } = Select;

type FormType = {};

type DiscretenessOptionsType = {
  value: DateFormat;
  label: string;
}[];

const createChartConfig = (data: any) => ({
  data,
  xField: "date",
  yField: "price",
  xAxis: {
    tickCount: 5,
  },
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

const rangeOptions = [
  { label: "Last 90 days", value: "season" },
  { label: "Last 30 days", value: "month" },
  { label: "Last day", value: "day" },
  { label: "Last hour", value: "hour" },
];

const discretenessOptions: DiscretenessOptionsType = [
  { label: "Hours", value: "YY-MM-DD hh:mm" },
  { label: "Days", value: "YY-MM-DD" },
  { label: "Weeks", value: "YY-MM wo [week]" },
];

function App() {
  const [form] = Form.useForm<FormType>();
  const discreteness = Form.useWatch("discreteness", form);
  const data = useMemo(() => getData(mocs.ethereum.transactions, discreteness), [discreteness]);
  const config = createChartConfig(data);

  return (
    <div className="App">
      <Row justify="center" style={{ paddingTop: "5vh" }}>
        <Col xs={18} style={{ marginBottom: "50px" }}>
          <Form
            form={form}
            name="basic"
            layout="inline"
            autoComplete="off"
            initialValues={{ discreteness: discretenessOptions[0].value }}
          >
            <Form.Item name="range" label="Range">
              <Select style={{ minWidth: "130px" }}>
                {rangeOptions.map((o) => (
                  <Option value={o.value} key={o.value}>
                    {o.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="discreteness" label="Discreteness">
              <Select style={{ minWidth: "90px" }}>
                {discretenessOptions.map((o) => (
                  <Option value={o.value} key={o.value}>
                    {o.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Col>

        <Col xs={18}>
          <Line {...config} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
