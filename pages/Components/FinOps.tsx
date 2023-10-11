import React, { useEffect, useState } from "react";
import { finOps } from "../api/finOps";
import { DateRangePicker } from "rsuite";
import moment from "moment";
import { useAppContext } from "./AppContext";
import "rsuite/dist/rsuite.min.css";
import PieChartComponent from "./Charts/PieChart";
import StackChartComponent from "./Charts/StackChart";
// import BubbleChartComponent from "./Charts/BubbleChart";

const FinOps = () => {
  let bu_id: string | null;
  const [url, setUrl] = useState<any>();
  const [data, setData] = useState<any>(null);
  const { time, toggleTime } = useAppContext();
  const { timeEnd, toggleTimeEnd } = useAppContext();
  const [cloud, setCloud] = useState("Azure");
  const [Id, setId] = useState();
  const [value, setValue] = React.useState<any>([
    new Date(time),
    new Date(timeEnd),
  ]);
  const { afterToday }: any = DateRangePicker;
  const predefinedRanges: any = [
    {
      label: "Last 1 hour",
      value: [
        new Date(moment().subtract(1, "hour").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],
      placement: "left",
    },
    {
      label: "Last 7 hour",
      value: [
        new Date(moment().subtract(7, "hour").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },

    {
      label: "Last day",

      value: [
        new Date(moment().subtract(1, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },

    {
      label: "Last 7 days",

      value: [
        new Date(moment().subtract(7, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },

    {
      label: "Last 15 days",

      value: [
        new Date(moment().subtract(15, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },

    {
      label: "Last 30 days",

      value: [
        new Date(moment().subtract(30, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },

    {
      label: "Last 90 days",

      value: [
        new Date(moment().subtract(90, "day").format("YYYY-MM-DDTHH:mm:ss")),
        new Date(moment().format("YYYY-MM-DDTHH:mm:ss")),
      ],

      placement: "left",
    },
  ];
  const handleIdChange = (e: any) => {
    setId(e.target.value);
  };
  const handleCloudChange = (e: any) => {
    setCloud(e.target.value);
  };
  // console.log("cloud", cloud);
  useEffect(() => {
    value && toggleTime(value[0]);
    value && toggleTimeEnd(value[1]);
  }, [value]);
  // if (typeof window !== "undefined") {
  // role = localStorage.getItem("role");
  useEffect(() => {
    bu_id = localStorage.getItem("bu_id");
    dataFetch();
  }, []);
  // }
  async function dataFetch() {
    // const res: any = await finOps(bu_id);
    // setData(res.data);
    // setUrl(data[1]);
  }
  // data && console.log("finops data", data[0].link);
  return (
    <div className="h-auto">
      <div className="text-xl border-b-2 px-4 border-slate-400 pb-2">
        FinOps
      </div>
      {/* {data ? ( */}
      <div className="p-4 mt-4 h-auto">
        <div className="flex justify-between items-center mb-4 p-3 bg-slate-300 rounded-lg">
          <div className="w-1/3">
            <label className="text-lg">Select Cloud : </label>
            <select
              className="block w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              onChange={(e) => handleCloudChange(e)}
            >
              <option disabled>Select Cloud</option>
              <option value="Azure">Azure</option>
              <option value="AWS">AWS</option>
            </select>
          </div>
          <div className="w-1/3 mx-2">
            {cloud == "Azure" ? (
              <label className="text-lg">Select Account Id : </label>
            ) : (
              <label className="text-lg">Select Subscription Id : </label>
            )}
            {/* <label className="text-lg ">Select Id : </label> */}
            <select
              className="block w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              //  onChange={(e) => handleIdChange(e)}
            >
              {/* subscription id or account id */}
              <option disabled>Select Id</option>
            </select>
          </div>
          <div className="w-1/3">
            <label className="text-lg">Select Date Range : </label>
            <DateRangePicker
              placement="auto"
              value={value}
              onChange={setValue}
              ranges={predefinedRanges}
              // showOneCalendar
              style={{ width: "100%" }}
              // shouldDisableDate={afterToday()}
              placeholder="Select Date Range"
              format="yyyy-MM-dd HH:mm:ss"
            />
          </div>
        </div>
        <div className="p-4 mt-4 h-auto">
          <div className="flex -mx-2 mb-4 space-x-8">
            <div className="card w-1/2 h-auto px-2 mb-4">
              <StackChartComponent />
            </div>
            <div className="card w-1/2 h-auto px-2 mb-4">
              <PieChartComponent />
            </div>
          </div>
          <div className="flex -mx-2 mb-4 space-x-8">
            <div className="card w-1/2 h-64 px-2 mb-4">
              {/* <BubbleChartComponent /> */}
              {/* <div className="card h-32 bg-white rounded-lg shadow-md"></div> */}
            </div>
            <div className="card w-1/2 h-64 px-2 mb-4">
              {/* <div className="card h-32 bg-white rounded-lg shadow-md"></div> */}
            </div>
          </div>
          <div className="flex -mx-2 mb-4 space-x-8">
            <div className="card w-1/2 h-64 px-2 mb-4">
              {/* <div className="card h-32 bg-white rounded-lg shadow-md"></div> */}
            </div>
            <div className="card w-1/2 h-64 px-2 mb-4">
              {/* <div className="card h-32 bg-white rounded-lg shadow-md"></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinOps;
