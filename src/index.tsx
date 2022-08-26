import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "antd/dist/antd.css";
import "@ant-design/flowchart/dist/index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
