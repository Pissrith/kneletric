"use client";

import React, { Fragment, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { IoStorefrontOutline } from "react-icons/io5";

import DashCard from "@/components/DashCard";
import DashCardr from "@/components/DashCardr";
import Nav from "@/components/Nav";
import Navbottom from "@/components/Navbottom";
import { NumberInput } from "@tremor/react";
import config from '../config'
type BuildingType = {
  id: number;
  name: string;
  Restaurant: RestaurantType[];
};

type RestaurantType = {
  id: number;
  name: string;
  Buildingid: number;
  Bill: BillType[];
  // include other properties of the restaurant objects if there are any
};
type BillType = {
  id: number;
  Date: string;
  start: number;
  end: number;
  sch: number;
  mea: number;
  Restaurantid: number;
};

export default function Home() {
  const [buildings, setBuildings] = useState<BuildingType[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(
    null
  );
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantType | null>(null);
  const [selectedBill, setSelectedBill] = useState<BillType | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(config.api_path+"/building/");
      setBuildings(response.data.building);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBuildingChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const buildingId = Number(event.target.value);
      const selectedBuilding = buildings.find((b) => b.id === buildingId);
      setSelectedBuilding(selectedBuilding || null);
    },
    [buildings]
  );
  const handleRestaurantChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (!selectedBuilding) return;
      const restaurantId = Number(event.target.value);
      const selectedRestaurant = selectedBuilding.Restaurant.find(
        (r) => r.id === restaurantId
      );
      setSelectedRestaurant(selectedRestaurant || null);
      if (selectedRestaurant && selectedRestaurant.Bill.length > 0) {
        setSelectedBill(selectedRestaurant.Bill[0]);
      } else {
        setSelectedBill(null);
      }
    },
    [selectedBuilding]
  );

  const handleBillChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (!selectedRestaurant) return;
      const billId = Number(event.target.value);
      const selectedBill = selectedRestaurant.Bill.find((b) => b.id === billId);
      setSelectedBill(selectedBill || null);
    },
    [selectedRestaurant]
  );

  const [start, setStart] = useState<number>();
  const [end, setEnd] = useState<number>();
  const [sch, setSchool] = useState<number>(selectedBill?.sch ?? 6);
  const [mea, setMea] = useState<number>(selectedBill?.mea ?? 3.14);

  useEffect(() => {
    if (selectedRestaurant && selectedRestaurant.Bill.length > 0) {
      setStart(selectedRestaurant.Bill[selectedRestaurant.Bill.length - 1].end);
    }
  }, [selectedRestaurant]);

  const handleStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStart(Number(event.target.value));
  };

  const handleEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnd(Number(event.target.value));
  };
  const handleMeaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMea(Number(event.target.value));
  };
  const handleSchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSchool(Number(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!start || !end||!sch||!mea||!date) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    if (end < start) {
      alert("End must be greater than start");
      return;
    }
  

    if (!selectedRestaurant) return;
    const newBill = {
      Restaurantid: selectedRestaurant.id,
      Date: date,
      start,
      sch,
      mea,
      end,
    };
    try {
      const response = await axios.post(config.api_path+"/bill/", newBill);
      await fetchData();
      // Set the selected bill to the new bill
      setSelectedBill(response.data);
      // Update the selected restaurant with the new bill
      const updatedRestaurant = { ...selectedRestaurant };
      updatedRestaurant.Bill = [...updatedRestaurant.Bill, response.data];
      setSelectedRestaurant(updatedRestaurant);
      alert("Add new bill success");
      closeBill();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // old
  const [value, setValue] = useState(6);
  const [isValueModalOpen, setIsValueModalOpen] = useState(false);
  const [isBillopen, setIsBillopen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedElectricity, setSelectedElectricity] = useState(null);
  const [isDropDownDateOpen, setisDropDownDateOpen] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);
  const [editDisabled, setEditDisabled] = useState(true);
  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("th-TH").format(number);
  };
  const handleButtonClick = () => {
    setEditDisabled(!editDisabled);
  };

  function closeModal() {
    setIsOpen(false);
  }
  function closeBill() {
    setIsBillopen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeValueModal() {
    setIsValueModalOpen(false);
  }

  function openValueModal() {
    setIsValueModalOpen(true);
    console.log("open");
  }
  function openBillModal() {
    setIsBillopen(true);
    console.log("open");
  }
  const [date, setDate] = useState(new Date());

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: Date = new Date(e.target.value);
    setDate(value);
  };
  return (
    <>
      <div className="h-screen">
        <Nav />
        <div className="flex justify-between">
          <div className="ml-5  items-center hover:shadow-primary hover:from-[#be123c] hover:to-[#fb7185] hover:shadow-inne hover:shadow-xl hover:scale-105 duration-300 rounded-md bg-accent/30 px-2 py-1 text-xs font-medium text-text ring-1 ring-inset ring-primary/10 motion-safe:hover:scale-110">
            {selectedRestaurant ? (
              <select
                className="text-sm md:text-lg bg-transparent"
                onChange={handleBillChange}
              >
                {selectedRestaurant.Bill.map((b, index) => {
                  const date = new Date(b.Date);
                  const formattedDate = date.toLocaleDateString("en-GB"); // 'dd/mm/yyyy' format
                  return (
                    <option key={index} value={b.id}>
                      {formattedDate}
                    </option>
                  );
                })}
              </select>
            ) : (
              <p className="px-5 text-sm md:text-lg">
                {new Date().toLocaleDateString("en-GB")}
              </p> // Current date in 'dd/mm/yyyy' format
            )}
          </div>
          <div className="mr-5  items-center hover:shadow-primary hover:from-[#be123c] hover:to-[#fb7185] hover:shadow-inne hover:shadow-xl hover:scale-105 duration-300 rounded-md bg-accent/30 px-2 py-1 text-xs font-medium text-text ring-1 ring-inset ring-primary/10 motion-safe:hover:scale-110">
            <button onClick={openBillModal}>
              <p className="text-sm md:text-lg ">เพิ่มค่าไฟประจำเดือน</p>
            </button>
          </div>
        </div>
        <div className="text-center ">
          <span className="text-center bg-background/10 font-bold inline-flex items-center   rounded-xl  text-xs text-primary my-1 sm:mb-3 px-10 py-1.5">
            <p className="text-xl sm:text-2xl lg:text-4xl ">ค่าไฟประจำเดือน</p>
          </span>
        </div>
        <div className="grid gap-1 md:mb-2 md:gap-4 sm:gap-2 xs:gap-1 grid-cols-2 md:items-center mx-5">
          <div
            className="rounded-lg border bg-primary text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="p-6 flex flex-row items-center justify-between pb-2 pt-2 space-y-0">
              <h3 className="tracking-tight text-background text-xs sm:text-xl md:text-2xl font-medium">
                หน่วยโรงเรียน {sch} บาท/หน่วย
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-white"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <div className="p-3">
              <div
                className={`text-2xl sm:text-4xl md:text-5xl text-center font-bold text-background`}
              >
                {formatNumber(
                  ((selectedBill?.end ?? 0) - (selectedBill?.start ?? 0)) * sch
                )}
              </div>
              <p
                className={`text-background text-xs mt-5  text-end `}
              >
                *ยังไม่รวมค่าบริการไฟฟ้า
              </p>
            </div>
          </div>
          <div
            className="rounded-lg border bg-secondary text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="p-6 flex flex-row items-center justify-between pb-2 pt-2 space-y-0">
              <h3 className="tracking-tight text-text text-xs sm:text-xl md:text-2xl font-medium">
               หน่วยการไฟฟ้า {mea} บาท/หน่วย
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-text"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <div className="p-3">
              <div
                className={`text-2xl sm:text-4xl md:text-5xl text-center font-bold text-text`}
              >
                {formatNumber(
                  ((selectedBill?.end ?? 0) - (selectedBill?.start ?? 0)) * mea
                )}
              </div>
              <p
                className={`text-text text-xs mt-5  text-end`}
              >
                *ยังไม่รวมค่าบริการไฟฟ้า
              </p>
            </div>
          </div>
        </div>
        {/* <Card /> */}
        <div className="grid  md:mb-2 md:gap-4 sm:gap-2 xs:gap-1 grid-cols-2 items-center mx-5">
          <button className="" onClick={openModal}>
            <div className="border hover:shadow-xl hover:shadow-primary  hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185] text-card-foreground  bg-text  rounded-lg shadow-md shadow-text p-4">
              <div className="flex items-center  justify-center mb-2">
                <IoStorefrontOutline size="3em" color="white" />
              </div>
              <div className="flex items-center  justify-center">
                <h3 className="text-2xl items-center  font-bold lg:text-end sm:text-center  text-background mb-2 lg:mr-3">
                  ร้าน
                </h3>
                <div className="text-white text-end sm:text-center lg:text-start lg:col-span-1 col-span-2">
                  <p className="text-lg text-background items-end mt-5 ml-3 underline underline-offset-4 hover:underline-offset-1">
                    {selectedRestaurant
                      ? selectedRestaurant.name
                      : "กรุณาเลือกร้านค้า"}
                  </p>
                </div>
              </div>
            </div>
          </button>
          <div className="px-2 pt-1 py-1 w-full ">
            <div className=" bg-accent my-3 p-2 hover:shadow-xl hover:shadow-text hover:scale-105 duration-300   rounded-lg shadow-lg shadow-text text-center">
              <p className="text-sm text-text">
                <span className="text-xl text-text font-bold pr-2">{mea}</span>
                บาท/หน่วย
              </p>
              <p className="text-xs text-background">
                อัตราค่าไฟฟ้าตามการไฟฟ้า
              </p>
            </div>
            <div className=" bg-accent hover:shadow-xl hover:shadow-text hover:scale-105 duration-300 my-3 p-2 rounded-lg shadow-lg shadow-text text-center">
              <p className="text-sm text-text">
                <span className="text-xl text-text font-bold pr-2">{sch}</span>
                บาท/หน่วย
              </p>
              <p className="text-xs text-background">
                อัตราค่าไฟฟ้าตามหน่วยโรงเรียน
              </p>
            </div>
          </div>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed  inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full h-80 max-w-md transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6  text-gray-900"
                    >
                      ร้านค้า
                    </Dialog.Title>

                    <div className="mt-5 grid-rows-3">
                      <div>
                      <label
                        htmlFor="buildings"
                        className="block text-sm font-medium text-gray-700"
                      >
                        เลือกอาคาร :
                      </label>{" "}
                      <select
                        id="buildings"
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
                      {selectedBuilding && (
                        <div>
                          <label
                            htmlFor="buildings"
                            className="block text-sm font-medium text-gray-700"
                          >
                            เลือกอาคาร :
                          </label>
                          <select
                            id="restaurants"
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
                        </div>
                      )}
                      <button
                          className="ml-32 sm:ml-[172px] mt-5 border px-2 py-1 bg-indigo-500 text-white rounded font-bold"
                          onClick={closeModal}
                        >
                          ยืนยัน
                        </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <Transition appear show={isValueModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeValueModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed  inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full h-80 max-w-md transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6  text-gray-900"
                    >
                      Edit Value
                    </Dialog.Title>

                    <div className="mt-5"></div>

                    <div className="mt-5"></div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* <Boxres /> */}
        {/* add bill */}
        <Transition appear show={isBillopen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeValueModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed  inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full h-80 max-w-md transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 justify-between text-gray-900"
                    >
                      เพิ่มค่าไฟประจำเดือน
                      <button
                        className=" ml-32 sm:ml-56 text-end text-red-500 font-bold"
                        onClick={closeBill}
                      >
                        X
                      </button>
                    </Dialog.Title>

                    {selectedRestaurant ? (
                      <form onSubmit={handleSubmit}>
                        <div className="">
                          
                        <div className="grid grid-cols-3 mt-2 ">
                        <label htmlFor="date" className="text-center">
                              {" "}
                              วันที่
                            </label>                          
                          <input
                            type="date"
                            id="Date"
                            name="Date"
                            className="col-span-2 mr-10 border border-black rounded-lg text-center"

                            onChange={handleDateChange}
                          />
                          </div>
                          <div className="grid grid-cols-3 mt-2 ">
                            <label htmlFor="start" className="text-center">
                              {" "}
                              หน่วยเริ่ม
                            </label>
                            <input
                              type="text"
                              value={start}
                              id="start"
                              className="col-span-2 mr-10 border border-black rounded-lg text-center"
                              onChange={handleStartChange}
                            />
                          </div>
                          <div className="grid grid-cols-3 mt-2 ">
                            <label htmlFor="end" className="text-center">
                              {" "}
                              หน่วยท้าย
                            </label>

                            <input
                              id="end"
                              type="text"
                              className="col-span-2 mr-10 border border-black rounded-lg text-center"
                              value={end}
                              onChange={handleEndChange}

                            />
                          </div>
                          <div className="grid grid-cols-3 mt-2 ">
                            <label htmlFor="mea" className="text-center">
                              {" "}
                              หน่วยการไฟฟ้า
                            </label>

                            <input
                              id="mea"
                              type="text"
                              className="col-span-2 mr-10 border border-black rounded-lg text-center"
                              value={mea}
                              defaultValue={3.14}
                              onChange={handleMeaChange}
                            />
                          </div>
                          <div className="grid grid-cols-3 mt-2 ">
                            <label htmlFor="sch" className="text-center">
                              {" "}
                              หน่วยโรงเรียน
                            </label>

                            <input
                              id="sch"
                              type="text"
                              className="col-span-2 mr-10 border border-black rounded-lg text-center"
                              value={sch}
                              onChange={handleSchChange}
                              defaultValue={6}
                            />
                          </div>
                        </div>

                        <div className="items-center text-end pt-2">
                          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ">
                            เพิ่มบิล
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <p className="text-xl text-center mt-20">
                          กรุณาเลือกร้านค้า
                        </p>
                        <button
                          className="ml-32 sm:ml-[172px] mt-5 border px-2 py-1 bg-red-500 text-white rounded font-bold"
                          onClick={closeBill}
                        >
                          ยืนยัน
                        </button>
                      </>
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        {/* Calculate         */}
        <div className=" shadow-lg shadow-text hover:shadow-primary hover:from-[#be123c] hover:to-[#fb7185] hover:shadow-inne hover:shadow-xl hover:scale-105 duration-300 bg-secondary mx-5 rounded-xl">
          <h3 className="text-center pt-1 sm:pt-2 lg:pt-3 text-lg sm:text-xl md:text-2xl ">
            หน่วยการใช้งานไฟฟ้า
          </h3>
          <div className="grid  grid-cols-3 md:items-center mx-5">
            <div className="  text-card-foreground   p-4 md:pt-6 w-full">
              <h3 className="tracking-tight text-center text-xl sm:text-3xl lg:5xl font-bold  ">
                {selectedBill?.start ?? 0}
              </h3>
              <h3 className="tracking-tight  text-sm sm:text-lg md:xl  font-bold text-center ">
                หน่วยเริ่ม
              </h3>
            </div>
            <div className=" text-card-foreground   p-4 md:pt-6 w-full">
              <h3 className="tracking-tight text-center text-xl sm:text-3xl lg:5xl font-bold  ">
                {selectedBill?.end ?? 0}
              </h3>
              <h3 className="tracking-tight  text-sm sm:text-lg md:xl  text-center font-bold ">
                หน่วยท้าย
              </h3>
            </div>
            <div className=" text-card-foreground   p-4 md:pt-6 w-full">
              <h3 className="tracking-tight text-center text-xl sm:text-3xl lg:5xl font-bold  ">
                {(selectedBill?.end ?? 0) - (selectedBill?.start ?? 0)}
              </h3>
              <h3 className="tracking-tight  text-sm sm:text-lg md:xl  text-center  font-bold">
                หน่วยใช้
              </h3>
            </div>
          </div>
        </div>
        <Navbottom />
      </div>
    </>
  );
}
