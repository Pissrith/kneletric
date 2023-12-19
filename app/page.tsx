"use client";

import React from "react";
import { Fragment, useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoStorefrontOutline } from "react-icons/io5";

import DashCard from "../components/DashCard";
import DashCardr from "../components/DashCardr";
import Nav from "../components/Nav";
import Navbottom from "../components/Navbottom";
import { NumberInput } from "@tremor/react";

type Building = {
  value: string;
  label: string;
};
const buildings: Building[] = [
  { value: "building1", label: "อาคาร1" },
  { value: "building2", label: "อาคาร2" },
];

type Electricity = {
  startUnit: number;
  endUnit: number;
  date: string;
};

type Shop = {
  value: string;
  label: string;
  electricity: Electricity[];
};


type Shops = {
  [key: string]: Shop[];
};

const shops: Shops = {
  building1: [
    {
      value: "ขายข้าวแกง",
      label: "ร้านขายข้าวแกง",
      electricity: [
        {
          startUnit: 0,
          endUnit: 100,
          date: "2022-01-01",
        },
        {
          startUnit: 100,
          endUnit: 200,
          date: "2022-02-01",
        },
      ],
    },
    {
      value: "น้ำ",
      label: "ร้านน้ำ",
      electricity: [
        {
          startUnit: 50,
          endUnit: 150,
          date: "2022-01-01",
        },
        {
          startUnit: 150,
          endUnit: 250,
          date: "2022-02-01",
        },
      ],
    },
  ],
  building2: [
    {
      value: "ขายข้าวมันไก่",
      label: "ร้านขายข้าวมันไก่",
      electricity: [
        {
          startUnit: 20,
          endUnit: 120,
          date: "2022-01-01",
        },
        {
          startUnit: 120,
          endUnit: 220,
          date: "2022-02-01",
        },
      ],
    },
    {
      value: "ไก่ทอด",
      label: "ร้านไก่ทอด",
      electricity: [
        {
          startUnit: 30,
          endUnit: 130,
          date: "2022-01-01",
        },
        {
          startUnit: 130,
          endUnit: 230,
          date: "2022-02-01",
        },
      ],
    },
  ],
};

export default function Home() {
  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0].value);
  const [value, setValue] = useState(6);
  const [isValueModalOpen, setIsValueModalOpen] = useState(false);
  const [isBillopen, setIsBillopen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedElectricity, setSelectedElectricity] = useState(null);
  const [isDropDownDateOpen, setisDropDownDateOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [editDisabled, setEditDisabled] = useState(true);

  const handleButtonClick = () => {
    setEditDisabled(!editDisabled);
  };
  const [selectedDate, setSelectedDate] = useState(
    shops[selectedBuilding][0].electricity[0].date
  );

  const handleBuildingChange = (event: any) => {
    setSelectedBuilding(event.target.value);
    setSelectedShop(shops[event.target.value][0].value);
    setSelectedDate(shops[event.target.value][0].electricity[0].date);
  };

  const handleShopChange = (event: any) => {
    setSelectedShop(event.target.value);
    const shop = shops[selectedBuilding].find(
      (shop) => shop.value === event.target.value
    );
    if (shop && shop.electricity && shop.electricity.length > 0) {
      setSelectedDate(shop.electricity[0].date);
    }
  };
  let electricityData;
  const shop = shops[selectedBuilding].find(
    (shop) => shop.value === selectedShop
  );
  if (shop) {
    const electricity = shop.electricity.find((e) => e.date === selectedDate);
    if (electricity) {
      electricityData = electricity;
    }
  }
  const startUnit = electricityData ? electricityData.startUnit : "-";
  const endUnit = electricityData ? electricityData.endUnit : "-";

  const handleDateChange = (event:any) => {
    setSelectedDate(event.target.value);
  };

  function closeModal() {
    setIsOpen(false);
  }
  function closeBill() {
    setIsBillopen(false);
  }
  function openModal() {
    setIsOpen(true);
    console.log("open");
  }
  function closeValueModal() {
    setIsValueModalOpen(false);
  }
  const changeValue = () => {
    if (inputRef.current) {
      setValue(Number(inputRef.current.value));
      console.log(value);
      closeValueModal();
    }
  };

  function openValueModal() {
    setIsValueModalOpen(true);
    console.log("open");
  }
  function openBillModal() {
    setIsBillopen(true);
    console.log("open");
  }
  useEffect(() => {
    for (const building in shops) {
      for (const shop of shops[building]) {
        if (shop.value === selectedShop) {
          console.log(shop.electricity);
        }
      }
    }
  
    if (selectedShop && selectedShop.electricity) {
      const sortedElectricity = selectedShop.electricity.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      if (sortedElectricity.length > 0 && selectedElectricity === null) {
        setSelectedElectricity(sortedElectricity[0]);
      }
    }
  }, [selectedShop]); // Only re-run the effect if count changes

  const toggleDropdown = () => {
    setisDropDownDateOpen(!isDropDownDateOpen);
  };

  const selectElectricity = (electricity) => {
    setSelectedElectricity(electricity);
    setisDropDownDateOpen(false);
  };
  return (
    <>
      <div className="">
        <Nav />
        <div className="flex justify-between">
          <select
            value={selectedDate}
            onChange={handleDateChange}
            className="ml-5 hover:shadow-primary hover:from-[#be123c] hover:to-[#fb7185] hover:shadow-inne hover:shadow-xl hover:scale-105 duration-300 rounded-md bg-accent/30 px-2 py-1 text-xs font-medium text-text ring-1 ring-inset ring-primary/10 motion-safe:hover:scale-110"
          >
            {shops[selectedBuilding]
              .find((shop) => shop.value === selectedShop)
              .electricity.map((e, index) => (
                <option className="" key={index} value={e.date}>
                  {e.date}
                </option>
              ))}
          </select>
          {isDropDownDateOpen && (
            <div className="">
              {sortedElectricity.map((item, index) => (
                <div key={index} onClick={() => selectElectricity(item)}>
                  {item.date}
                </div>
              ))}
            </div>
          )}
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
          <DashCard
            title="อัตราค่าไฟฟ้า6บาท/หน่วย"
            value={(endUnit - startUnit) * value}
            // replace 'startUnit' with the property you want to display
            disclaimer="*ยังไม่รวมค่าบริการไฟฟ้า"
          />
          <DashCardr
            title="อัตราค่าไฟฟ้า6บาท/หน่วย"
            value={(endUnit - startUnit) * 6}
            disclaimer="*ยังไม่รวมค่าบริการไฟฟ้า"
            cardBgColor="secondary"
            textBgColor="text"
            iconColor="text-secondary"
          />
        </div>
        {/* <Card /> */}
        <div className="grid  md:mb-2 md:gap-4 sm:gap-2 xs:gap-1 grid-cols-2 items-center mx-5">
          <button onClick={openModal}>
            <div className="border hover:shadow-xl hover:shadow-primary hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185] text-card-foreground bg-text dark:bg-gray-800 rounded-lg shadow-md shadow-text p-4">
              <div className="flex items-center  justify-center mb-2">
                <IoStorefrontOutline size="3em" color="white" />
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-2">
                <h3 className="text-2xl font-bold lg:text-end sm:text-center  text-background mb-2 lg:mr-3">
                  ร้าน
                </h3>
                <div className="text-white text-end sm:text-center lg:text-start lg:col-span-1 col-span-2">
                  <p className="text-lg text-background items-end mt-5 ml-3 underline underline-offset-4 hover:underline-offset-1">
                    {selectedShop}
                  </p>
                </div>
              </div>
            </div>
          </button>
          <div className="px-2 pt-1 py-1 w-full ">
            <div className=" bg-accent my-3 p-2 hover:shadow-xl hover:shadow-text hover:scale-105 duration-300   rounded-lg shadow-lg shadow-text text-center">
              <p className="text-sm text-text">
                <span className="text-xl text-text font-bold pr-2">
                  {value}
                </span>
                บาท/หน่วย
              </p>
              <p className="text-xs text-background">อัตราค่าไฟฟ้า</p>
            </div>
            <div className=" bg-accent hover:shadow-xl hover:shadow-text hover:scale-105 duration-300 my-3 p-2 rounded-lg shadow-lg shadow-text text-center">
              <p className="text-sm text-text">
                <span className="text-xl text-text font-bold pr-2">6</span>
                บาท/หน่วย
              </p>
              <p className="text-xs text-background">อัตราค่าไฟฟ้า</p>
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

                    <div className="mt-5">
                      <div className="mt-5 space-y-4">
                        <div>
                          <label
                            htmlFor="buildings"
                            className="block text-sm font-medium text-gray-700"
                          >
                            เลือกอาคาร:
                          </label>{" "}
                          <select
                            value={selectedBuilding}
                            onChange={handleBuildingChange}
                            className="border p-2 rounded mb-4"
                          >
                            {buildings.map((building) => (
                              <option
                                key={building.value}
                                value={building.value}
                              >
                                {building.label}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor="buildings"
                            className="block text-sm font-medium text-gray-700"
                          >
                            เลือกร้านค้า:
                          </label>{" "}
                          <select
                            value={selectedShop}
                            onChange={handleShopChange}
                            className="border p-2 rounded mb-4"
                          >
                            {shops[selectedBuilding].map((shop) => (
                              <option key={shop.value} value={shop.value}>
                                {shop.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
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

                    <div className="mt-5">
                      <input
                        type="text"
                        ref={inputRef}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="mt-5">
                      <button
                        type="button"
                        onClick={changeValue}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Confirm
                      </button>
                    </div>
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
                      className="text-lg font-medium leading-6  text-gray-900"
                    >
                      เพิ่มค่าไฟประจำเดือน
                    </Dialog.Title>

                    <div className="mt-2">
                      <div className="grid grid-cols-2">
                        <div className="mr-5">
                          <label className="text-black">หน่วยเริ่ม</label>
                          <NumberInput placeholder="หน่วยเริ่ม" />
                        </div>
                        <div>
                          <div className="mr-5">
                            <label className="text-black">หน่วยท้าย</label>
                            <NumberInput placeholder="หน่วยท้าย" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 mt-1">
                        <div className=" col-span-2">
                          <label htmlFor="">อัตราค่าไฟของโรงเรียน</label>
                          <NumberInput
                            placeholder="อัตราค่าไฟของโรงเรียน"
                            defaultValue={6}
                            disabled={editDisabled}
                          />
                        </div>

                        <button
                          onClick={handleButtonClick}
                          className="mt-6 mx-6 bg-secondary text-white rounded"
                        >
                          {isDisabled ? "แก้ไข" : "ยืนยัน"}
                        </button>
                      </div>
                      <div className="grid grid-cols-3 mt-1">
                        <div className=" col-span-2">
                          <label htmlFor="">อัตราค่าไฟของโรงเรียน</label>
                          <NumberInput
                            defaultValue={6}
                            placeholder="อัตราค่าไฟของโรงเรียน"
                            disabled={editDisabled}
                          />
                        </div>

                        <button
                          onClick={handleButtonClick}
                          className="mt-6 mx-6 bg-secondary text-white rounded"
                        >
                          {isDisabled ? "แก้ไข" : "ยืนยัน"}
                        </button>
                      </div>
                    </div>

                    <div className="mt-5 text-end mr-6">
                      <button
                        type="button"
                        onClick={closeBill}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
        {/* Calculate         */}
        <div className=" shadow-lg shadow-text hover:shadow-primary hover:from-[#be123c] hover:to-[#fb7185] hover:shadow-inne hover:shadow-xl hover:scale-105 duration-300 bg-secondary mx-5 rounded-xl">
          <h3 className="text-center pt-1 sm:pt-2 lg:pt-3 text-lg sm:text-xl md:text-2xl ">
            หน่วยการใช้งานไฟฟ้า
          </h3>
          <div className="grid  grid-cols-3 md:items-center mx-5">
            <div className="  text-card-foreground  dark:bg-gray-800  p-4 md:pt-6 w-full">
              <h3 className="tracking-tight text-center text-xl sm:text-3xl lg:5xl font-bold  ">
                {startUnit}
              </h3>
              <h3 className="tracking-tight  text-sm sm:text-lg md:xl  font-bold text-center ">
                หน่วยเริ่ม
              </h3>
            </div>
            <div className=" text-card-foreground  dark:bg-gray-800  p-4 md:pt-6 w-full">
              <h3 className="tracking-tight text-center text-xl sm:text-3xl lg:5xl font-bold  ">
                {endUnit}
              </h3>
              <h3 className="tracking-tight  text-sm sm:text-lg md:xl  text-center font-bold ">
                หน่วยท้าย
              </h3>
            </div>
            <div className=" text-card-foreground  dark:bg-gray-800  p-4 md:pt-6 w-full">
              <h3 className="tracking-tight text-center text-xl sm:text-3xl lg:5xl font-bold  ">
                {endUnit - startUnit}
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
