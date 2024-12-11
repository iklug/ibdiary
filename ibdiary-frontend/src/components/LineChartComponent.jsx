import { LineChart } from "@mui/x-charts/LineChart";
import { ScatterChart } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";
import { ItemTooltip } from "./ItemTooltip";
import classNames from "classnames";
import { ResponsiveChartContainer } from "@mui/x-charts";
export default function LineChartComponent({ stress, symptoms, days }) {
  const [viewing, setViewing] = useState("stress");
  console.log("🥶", viewing);
  const toggleView = () => {
    setViewing(!viewing);
  };
  const values = viewing === "stress" ? stress : symptoms;
  return (
    <div className=" h-1/2 w-full flex flex-col flex-shrink-1 gap-3">
      <div className="flex justify-around px-4 gap-3 pt-2 bg-green-50">
        <div
          className={classNames(
            viewing === "stress"
              ? "bg-green-300 text-gray-800 "
              : "bg-gray-100 border border-gray-200 ",
            "px-6 py-1 w-full h-10 flex rounded-lg justify-center items-center"
          )}
          onClick={() => setViewing("stress")}
        >
          Stress
        </div>
        <div
          className={classNames(
            viewing === "symptom"
              ? "bg-green-300 text-gray-800 "
              : "bg-gray-100 border border-gray-200",
            "px-6 py-1 w-full h-10 flex justify-center items-center rounded-lg"
          )}
          onClick={() => setViewing("symptom")}
        >
          Symptoms
        </div>
      </div>

      <div className="w-full h-3/4 bg-green-50 flex justify-center px-2">
        <PieChart
          series={[
            {
              ...values,
              arcLabel: (item) =>
                `${item.value} day${item.value > 1 ? "s" : ""}`,
              arcLabelMinAngle: 60,
              valueFormatter: (item) =>
                `${item.value} day${item.value > 1 ? "s" : ""}`,
            },
          ]}
          legend={{
            direction: "column",
            position: {
              horizontal: "right",
              vertical: "middle",
            },
            padding: {
              right: -10,
            },
            itemMarkHeight: 15,
            itemMarkWidth: 15,
          }}
        />
        {/* <ItemTooltip /> */}
      </div>
    </div>
  );
}
