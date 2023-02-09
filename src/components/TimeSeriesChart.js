import React, { PureComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
} from "recharts";

export default function TimeSeriesChart(props) {
  const [graphData, setData] = useState([]);
  const createData = () => {
    var allBills = [...props.bills];
    console.log(allBills);
    var dict = {};
    var data = [];
    allBills.forEach((bill) => {
      var realDate = new Date(bill.date.replace("-", "/"));
      var date = realDate.toString();
      var key = date.substring(4, 10) + date.substring(10, 15);
      if (dict[key] !== undefined) {
        dict[key].amount = dict[key].amount + Number(bill.amount);
      } else {
        dict[key] = {
          amount: Number(bill.amount),
          realDate: realDate,
        };
      }
    });
    for (var key in dict) {
      data.push({
        realDate: dict[key].realDate,
        name: key,
        amt: dict[key].amount,
      });
    }
    data.sort(function (a, b) {
      return a.realDate > b.realDate ? 1 : b.realDate > a.realDate ? -1 : 0;
    });
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    createData();
  }, [props.bills]);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="amt"
          stroke="#101010"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
