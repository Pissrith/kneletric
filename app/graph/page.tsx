"use client";

import React, { Fragment, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { IoStorefrontOutline } from "react-icons/io5";
import { Card, LineChart, Title } from "@tremor/react";

import DashCard from "@/components/DashCard";
import DashCardr from "@/components/DashCardr";
import Nav from "@/components/Nav";
import Navbottom from "@/components/Navbottom";
import { NumberInput } from "@tremor/react";

import { LineChartInteractiveExample } from "../../components/LineCharttest";
import { LineChartInteractiveExample2 } from "../../components/LineCharttest2";
import Image from "next/image";

type BuildingType = {
  id: number;
  name: string;
  Restaurant: RestaurantType[];
};

type RestaurantType = {
  id: number;
  name: string;
  Buildingid: number;
};

export default function Home() {
  const [buildings, setBuildings] = useState<BuildingType[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(
    null
  );
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantType | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3003/building/");
      setBuildings(response.data.building);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const [value, setValue] = React.useState(null);

  const handleBuildingChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const buildingId = Number(event.target.value);
      const selectedBuilding = buildings.find((b) => b.id === buildingId);
      setSelectedBuilding(selectedBuilding || null);
    },
    [buildings]
  );
  const [data, setData] = useState([]);
  const handleRestaurantChange = useCallback(
    async (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (!selectedBuilding) return;
      const restaurantId = Number(event.target.value);
      const selectedRestaurant = selectedBuilding.Restaurant.find(
        (r) => r.id === restaurantId
      );
      setSelectedRestaurant(selectedRestaurant || null);

      try {
        const response = await fetch(
          `http://localhost:3003/yearlybill/${restaurantId}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [selectedBuilding]
  );

  const [totalYearlyBillData, setTotalYearlyBillData] = useState([]);

useEffect(() => {
  const fetchTotalYearlyBillData = async () => {
    try {
      const response = await fetch('http://localhost:3003/totalyearlybill');
      const data = await response.json();
      setTotalYearlyBillData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchTotalYearlyBillData();
}, []);
console.log(totalYearlyBillData)
  return (
    <div className="bg-background">
      <Nav />
      <div className="flex flex-col items-center mb-16 lg:mb-0 justify-center bg-background dark:bg-gray-900 ">
        <div className="w-full max-w-2xl p-4 space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-md p-4 flex">
            <div className="mx-2">
              <label
                htmlFor="buildings"
                className="block text-sm font-medium text-gray-700"
              >
                เลือกอาคาร :
              </label>{" "}
              <select
                className="border p-2 rounded mb-4"
                onChange={handleBuildingChange}
              >
                <option value="" disabled selected>
                  เลือกอาคาร
                </option>
                {buildings.map((b, index) => (
                  <option key={index} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mx-2">
              <label
                htmlFor="restaurants"
                className="block text-sm font-medium text-gray-700"
              >
                เลือกร้านอาหาร :
              </label>{" "}
              {selectedBuilding && (
                <select
                  className="border p-2 rounded mb-4"
                  onChange={handleRestaurantChange}
                >
                  <option value="" disabled selected>
                    เลือกร้านค้า
                  </option>
                  {selectedBuilding.Restaurant.map((r, index) => (
                    <option key={index} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              )}
             
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-md p-4">
            <div className="w-full aspect-[2/1]">
              <div>
                <Card>
                  <Title>ค่าไฟประจำเดือน ของร้าน {selectedRestaurant?.name}</Title>
                  <LineChart
                    className="h-72 mt-4"
                    data={data}
                    index="Date"
                    categories={[
                      "คิดตามหน่วยโรงเรียน",
                      "คิดหน่วยการไฟฟ้า",
                    ]}
                    colors={["red", "indigo"]}
                    yAxisWidth={30}
                    onValueChange={(v:any) => setValue(v)}
                    connectNulls={true}
                  />
                  <p className="text-end">
                  </p>
                </Card>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-md p-4 mb-32">
            <div className="w-full aspect-[2/1]">
              <div>
              <Card>
                  <Title>รวมค่าไฟของร้านในโรงเรียนทั้งหมด</Title>
                  <LineChart
                    className="h-72 mt-4"
                    data={totalYearlyBillData}
                    index="date"
                    categories={[
                      "คิดตามหน่วยโรงเรียน",
                      "คิดหน่วยการไฟฟ้า",
                    ]}
                    colors={["red", "indigo"]}
                    yAxisWidth={30}
                    onValueChange={(v:any) => setValue(v)}
                    connectNulls={true}
                  />
                  <p className="text-end">
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbottom />
    </div>
  );
}
