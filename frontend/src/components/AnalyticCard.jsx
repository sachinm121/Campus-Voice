import React from "react";
import { LineChart, Line, Tooltip ,ResponsiveContainer } from "recharts";
import { IoAnalyticsOutline } from "react-icons/io5";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const AnalyticCard = (props) => {
  return (
    <div className="w-[300px] h-[150px] rounded-md bg-[#0d0452] flex text-white p-4">
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <IoAnalyticsOutline className="w-8 h-8" />
          <p className="text-[16px] w-16 block font-bold">
            {props.title}
          </p>
        </div>
        <p className="text-[36px] font-bold">{props.count}</p>
      </div>
      <div className="flex flex-col w-[100%]">
        <ResponsiveContainer width="80%" height="80%">
          <LineChart width={300} height={100} data={data}>
            <Tooltip 
                contentStyle={{background: "transparent", border: "none"}}
                labelStyle={{display: "none"}}
            />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className={`text-end pr-10 text-[24px] font-bold pb-3 text-[${props.color}]`}>{props.percentage}</p>
      </div>
    </div>
  );
};

export default AnalyticCard;
