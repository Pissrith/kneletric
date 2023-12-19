"use client";
import { Card, LineChart, Title } from "@tremor/react";
import React from "react";

const chartdata2 = [
  {
    date: "Jan 23",
    "ค่าไฟตามหน่วยโรงเรียน": 345,
    "ค่าไฟตามหน่วยการไฟฟ้า": 278,
  },
  {
    date: "Feb 23",
    "ค่าไฟตามหน่วยโรงเรียน": 545,
    "ค่าไฟตามหน่วยการไฟฟ้า": 478,
  },
  {
    date: "Mar 23",
    "ค่าไฟตามหน่วยโรงเรียน": 455,
    "ค่าไฟตามหน่วยการไฟฟ้า": 338,
  },
  {
    date: "Apr 23",
    "ค่าไฟตามหน่วยโรงเรียน": 245,
    "ค่าไฟตามหน่วยการไฟฟ้า": 178,
  },
  {
    date: "May 23",
    "ค่าไฟตามหน่วยโรงเรียน": 345,
    "ค่าไฟตามหน่วยการไฟฟ้า": 278,
  },
  {
    date: "Jun 23",
    "ค่าไฟตามหน่วยโรงเรียน": 545,
    "ค่าไฟตามหน่วยการไฟฟ้า": 378,
  },
  {
    date: "Jul 23",
    "ค่าไฟตามหน่วยโรงเรียน": 145,
    "ค่าไฟตามหน่วยการไฟฟ้า": 78,
  },
  {
    date: "Aug 23",
    "ค่าไฟตามหน่วยโรงเรียน": 445,
    "ค่าไฟตามหน่วยการไฟฟ้า": 228,
  },
  {
    date: "Sep 23",
    "ค่าไฟตามหน่วยโรงเรียน": 45,
    "ค่าไฟตามหน่วยการไฟฟ้า": 78,
  },
  {
    date: "Oct 23",
    "ค่าไฟตามหน่วยโรงเรียน": 145,
    "ค่าไฟตามหน่วยการไฟฟ้า": 94,
  },
  {
    date: "Nov 23",
    "ค่าไฟตามหน่วยโรงเรียน": 175,
    "ค่าไฟตามหน่วยการไฟฟ้า": 108,
  },
  {
    date: "Dec 23",
    "ค่าไฟตามหน่วยโรงเรียน":200,
    "ค่าไฟตามหน่วยการไฟฟ้า": 185,
  },
];

export const LineChartInteractiveExample = () => {
  const [value, setValue] = React.useState(null);
  const calculateSum = (key) => {
    return chartdata2.reduce((sum, item) => sum + item[key], 0);
  };

  const sumSchool = calculateSum("ค่าไฟตามหน่วยโรงเรียน");
  const sumElectricity = calculateSum("ค่าไฟตามหน่วยการไฟฟ้า");
  return (
    <>
      <Card>
        <Title>ค่าไฟประจำเดือน ของร้าน ข้าวมันไก่</Title>
        <LineChart
          className="h-72 mt-4"
          data={chartdata2}
          index="date"
          categories={["ค่าไฟตามหน่วยโรงเรียน", "ค่าไฟตามหน่วยการไฟฟ้า"]}
          colors={["red", "indigo"]}
          yAxisWidth={30}
          onValueChange={(v) => setValue(v)}
          connectNulls={true}
        />
         <p className="text-end">ส่วนต่างทั้งหมด : {sumSchool-sumElectricity}</p>
      </Card>

    </>
  );
};
