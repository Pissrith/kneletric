"use client";
import { Card, LineChart, Title } from "@tremor/react";
import React from "react";

const chartdata2 = [
  {
    date: "Jan 23",
    "ค่าไฟตามหน่วยโรงเรียน": 3345,
    "ค่าไฟตามหน่วยการไฟฟ้า": 3178,
  },
  {
    date: "Feb 23",
    "ค่าไฟตามหน่วยโรงเรียน": 1545,
    "ค่าไฟตามหน่วยการไฟฟ้า": 1478,
  },
  {
    date: "Mar 23",
    "ค่าไฟตามหน่วยโรงเรียน": 2955,
    "ค่าไฟตามหน่วยการไฟฟ้า": 2738,
  },
  {
    date: "Apr 23",
    "ค่าไฟตามหน่วยโรงเรียน": 2245,
    "ค่าไฟตามหน่วยการไฟฟ้า": 2078,
  },
  {
    date: "May 23",
    "ค่าไฟตามหน่วยโรงเรียน": 2345,
    "ค่าไฟตามหน่วยการไฟฟ้า": 2278,
  },
  {
    date: "Jun 23",
    "ค่าไฟตามหน่วยโรงเรียน": 2545,
    "ค่าไฟตามหน่วยการไฟฟ้า": 2378,
  },
  {
    date: "Jul 23",
    "ค่าไฟตามหน่วยโรงเรียน": 2145,
    "ค่าไฟตามหน่วยการไฟฟ้า": 2078,
  },
  {
    date: "Aug 23",
    "ค่าไฟตามหน่วยโรงเรียน": 2445,
    "ค่าไฟตามหน่วยการไฟฟ้า": 2228,
  },
  {
    date: "Sep 23",
    "ค่าไฟตามหน่วยโรงเรียน": 2425,
    "ค่าไฟตามหน่วยการไฟฟ้า": 2278,
  },
  {
    date: "Oct 23",
    "ค่าไฟตามหน่วยโรงเรียน": 2145,
    "ค่าไฟตามหน่วยการไฟฟ้า": 1994,
  },
  {
    date: "Nov 23",
    "ค่าไฟตามหน่วยโรงเรียน": 2175,
    "ค่าไฟตามหน่วยการไฟฟ้า": 2108,
  },
  {
    date: "Dec 23",
    "ค่าไฟตามหน่วยโรงเรียน":2200,
    "ค่าไฟตามหน่วยการไฟฟ้า": 2185,
  },
];

export const LineChartInteractiveExample2 = () => {
  const [value, setValue] = React.useState(null);
  const calculateSum = (key) => {
    return chartdata2.reduce((sum, item) => sum + item[key], 0);
  };

  const sumSchool = calculateSum("ค่าไฟตามหน่วยโรงเรียน");
  const sumElectricity = calculateSum("ค่าไฟตามหน่วยการไฟฟ้า");
  return (
    <>
      <Card>
        <Title>ค่าไฟประจำเดือนของทุกร้านอาหาร</Title>
        <LineChart
          className="h-72 mt-4"
          data={chartdata2}
          index="date"
          categories={["ค่าไฟตามหน่วยโรงเรียน", "ค่าไฟตามหน่วยการไฟฟ้า"]}
          colors={["red", "blue"]}
          yAxisWidth={30}
          onValueChange={(v) => setValue(v)}
          connectNulls={true}
        />
         <p className="text-end">ส่วนทางทั้งหมด: {sumSchool-sumElectricity}</p>
      </Card>

    </>
  );
};
