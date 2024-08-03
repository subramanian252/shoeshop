"use client";

import React from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Tooltip,
  Legend,
  Line,
} from "recharts";

interface Props {
  data: {
    date: string;
    amount: number;
  }[];
}

const aggregateData = (data: { date: string; amount: number }[]) => {
  const newData = data.reduce((acc, item) => {
    const date = new Date(item.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += item.amount;
    return acc;
  }, {} as { [key: string]: number });

  return Object.keys(newData).map((key) => ({
    date: key,
    amount: newData[key],
  }));
};

function Chart(props: Props) {
  const { data } = props;

  const aggregatedData = aggregateData(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={aggregatedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
