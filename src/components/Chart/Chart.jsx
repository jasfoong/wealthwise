import { LineChart } from "@mui/x-charts";
import "./Chart.scss";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  notifyEmergencyCost,
  notifySurpriseGain,
  notifyPayDay,
  notifyInflation
} from "./notification";


export default function Chart() {
  const [accountBalanceData, setAccountBalanceData] = useState([
    { x: 0, y: -5000 },
    { x: 1, y: 3000 },
  ]);

  const changeEachDay = -200; //formula here like expenses /30?
  const surpriseCost = -3000; //  fixed amount?
  const surpriseGain = +2000; //formula here like (investements+savings)* 1.25
  const income = +3000; //formula/ input?

  function clickHandler() {
    const newData = [...accountBalanceData];
    const lastDataPoint = newData[newData.length - 1];
    const newDay = lastDataPoint.x + 1;

    console.log(`everyday expenses`, changeEachDay);
    let newBalance = lastDataPoint.y + changeEachDay;

    if (newDay % 3 === 0) {
      newBalance += surpriseGain;
      notifySurpriseGain();
      console.log(`surprise gain: `, surpriseGain);
    }
    if (newDay % 7 === 0) {
      newBalance += surpriseCost;
      notifyEmergencyCost();
      console.log(`surprise expense: `, surpriseCost);
    }
    if (newDay % 5 === 0) {
      newBalance += income;
      notifyPayDay();
      console.log(`pay day: `, income);
    }

    if (newDay % 10 === 0) {
      newBalance += changeEachDay * 1.5;
      notifyInflation();
      console.log(`inflation: `, changeEachDay * 1.5);
    }

    console.log({ x: newDay, y: newBalance });
    newData.push({ x: newDay, y: newBalance });

    setAccountBalanceData(newData);
  }

  return (
    <div className="chart">
      <ToastContainer />
      <LineChart
        className="chart__graphic"
        xAxis={[{ dataKey: "x", label: "days" }]}
        dataset={accountBalanceData}
        series={[{ dataKey: "y", area: true }]}
        yAxis={[
          {
            colorMap: {
              type: "piecewise",
              thresholds: [0],
              colors: ["#ff220081", "#35860395"],
              label: "$money",
            },
          },
        ]}
        width={300}
        height={320}
      />
      <button className="chart__button" onClick={clickHandler}>
        simulate a new day
      </button>
    </div>
  );
}