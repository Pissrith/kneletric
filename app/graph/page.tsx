import { LineChartInteractiveExample } from "../../components/LineCharttest";
import { LineChartInteractiveExample2 } from "../../components/LineCharttest2";
import Image from "next/image";
import { Card } from "@tremor/react";
import Nav from "@/components/Nav";
import Navbottom from "@/components/Navbottom";
export default function Home() {
  return (
    <div className="bg-background">
      <Nav />
      <div className="flex flex-col items-center mb-16 lg:mb-0 justify-center bg-background dark:bg-gray-900 ">
        <div className="w-full max-w-2xl p-4 space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-md p-4 flex">
            <div className="mx-2">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                วัน/เดือน/ปี :
              </label>{" "}
              <select className="border p-2 rounded mb-4 w-20">
                <option>วันที่</option>
              </select>
            </div>
            <div className="mx-2">
              <label
                htmlFor="buildings"
                className="block text-sm font-medium text-gray-700"
              >
                เลือกอาคาร :
              </label>{" "}
              <select className="border p-2 rounded mb-4">
                <option>อาคาร</option>
              </select>
            </div>
            <div className="mx-2">
              <label
                htmlFor="restaurants"
                className="block text-sm font-medium text-gray-700"
              >
                เลือกร้านอาหาร :
              </label>{" "}
              <select className="border p-2 rounded mb-4">
                <option>ร้านอาหาร</option>
              </select>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-md p-4">
            <div className="w-full aspect-[2/1]">
              <div>
                <LineChartInteractiveExample />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-md p-4 mb-32">
            <div className="w-full aspect-[2/1]">
              <div>
                <LineChartInteractiveExample2 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbottom />
    </div>
  );
}
