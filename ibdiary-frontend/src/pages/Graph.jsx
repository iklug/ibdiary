import { useDispatch, useSelector } from "react-redux";
import constructMonth from "../utils/constructMonth";
import getGraphData from "../utils/getGraphData";
import { selectCalendar } from "../redux/calendarSlice";
import LineChartComponent from "../components/LineChartComponent";
import pieChartData from "../utils/pieChartData";
import * as ss from "simple-statistics";
import CalendarHeader from "../components/CalendarHeader";
import ChevronButtonsMonth from "../components/ChevronButtonsMonth";
import DropdownMenu from "../components/DropdownMenu";
import GraphHeader from "../components/GraphHeader";
import dataMath from "../utils/dataMath";
import classNames from "classnames";
import { selectMonth } from "../redux/monthSlice";
export default function Graph() {
  const calendarData = useSelector(selectCalendar);
  const currentMonth = useSelector(selectMonth);
  const monthArray = constructMonth(currentMonth.year, currentMonth.month);
  const graphData = getGraphData(calendarData, monthArray);
  const simpleMonthArray = [...Array(monthArray.length).keys()];

  const pieData = pieChartData(calendarData, monthArray);

  const correlation = ss
    .sampleCorrelation(graphData[0].data, graphData[1].data)
    .toFixed(2);
  const stressData = graphData[0].data;
  const symptomData = graphData[1].data;

  console.log("stressData", stressData);

  const averageStress = (
    stressData.reduce((x, y) => x + y, 0) / stressData.length
  ).toFixed(1);
  const averageSymptoms = (
    stressData.reduce((x, y) => x + y, 0) / stressData.length
  ).toFixed(1);

  const mathObject = dataMath(graphData, ss);

  return (
    <div className="flex flex-col h-screen max-h-full  w-full bg-green-50">
      {/* i don't think the header is the problem */}
      <GraphHeader>
        <ChevronButtonsMonth />
        <DropdownMenu />
      </GraphHeader>
      <div className="flex h-3/4 flex-col bg-green-50">
        <LineChartComponent
          stress={pieData[0]}
          symptoms={pieData[1]}
          days={simpleMonthArray}
        />
        <div
          id="bottom half of screen"
          className="bg-green-50 flex justify-center items-center h-1/2 w-full rounded-lg pb-4 px-4"
        >
          <div
            id="white box column"
            className=" bg-white shadow-md rounded-lg h-full w-full flex flex-col justify-between p-4"
          >
            {mathObject.noData ? (
              <div className="h-full bg-gray-100 rounded-lg flex gap-2 justify-center items-center flex-col">
                <div className="text-lg text-gray-800 font-semibold">
                  There is no data for this month.
                </div>
                <div className="text-sm text-gray-800">
                  Add data to your calendar to see it here.
                </div>
              </div>
            ) : (
              <>
                <div
                  id="row in white box"
                  className="flex justify-center w-full h-1/2"
                >
                  <div
                    id="grey box"
                    className="flex flex-col items-center h-full w-full justify-start gap-3 bg-gray-50 p-2"
                  >
                    <div className="text-center">
                      <div className="text-xs text-gray-700">Average</div>
                      <div className="text-sm font-semibold">Stress</div>
                    </div>
                    <div
                      className={classNames(
                        `${mathObject.stressColor}`,
                        "text-gray-800 font-semibold p-4 rounded-full flex justify-center items-center"
                      )}
                    >
                      <div className="h-2 w-2 flex justify-center items-center">
                        {mathObject.stressAverage}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full items-center justify-start gap-3 bg-gray-50 p-2 h-full">
                    <div className="text-center">
                      <div className="text-xs text-gray-700">Average</div>
                      <div className="text-sm font-semibold">Symptoms</div>
                    </div>
                    <div
                      className={classNames(
                        `${mathObject.symptomColor}`,
                        "text-gray-800 font-semibold p-4 rounded-full flex justify-center items-center"
                      )}
                    >
                      <div className="h-2 w-2 flex justify-center items-center">
                        {mathObject.symptomAverage}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="bottom row"
                  className="h-1/2 bg-gray-50 rounded-lg flex flex-col justify-center items-center"
                >
                  <div className="text-center font-semibold">
                    {/* Correlation between Stress and Symptoms */}
                  </div>
                  <div className=" h-full flex justify-center items-center">
                    <div className="bg-violet-800 text-violet-50 px-10 py-4 rounded-lg">
                      {mathObject.correlationString}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
