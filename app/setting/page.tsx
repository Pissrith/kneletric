"use client";

import React, { Fragment, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import Nav from "@/components/Nav";
import Navbottom from "@/components/Navbottom";
import { NumberInput } from "@tremor/react";
import config from "../../config";
import Image from "next/image";
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@tremor/react";
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
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const handleNameChange = (event: any) => {
    setNewName(event.target.value);
  };
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(
    null
  );
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantType | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(config.api_path + "/building/");
        setBuildings(response.data.building);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
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

  const handleConfirmClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(config.api_path+'/updaterestaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedRestaurant?.id,
          name: newName,
        }),
      });
  
      if (!response.ok) {
        throw new Error('An error occurred while updating the restaurant.');
      }
  
      setNewName(''); // Clear the input field
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error(error);
    } 
  };

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  const handleEditClick = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setNewName(restaurant.name);
    setIsOpen(true);
  };
  return (
    <div className="bg-background h-screen">
      <Nav />
      {isLoading ? 'Loading...' : (
        <>
        <div className="flex flex-col flex-wrap  items-center mb-16 lg:mb-0 justify-center bg-background  ">
        <div className="w-full max-w-2xl p-4 space-y-6">
          <div className="bg-white shadow rounded-md p-4">
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
            <div>

            <Table className="">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Restaurant ID</TableHeaderCell>
                  <TableHeaderCell>Restaurant Name</TableHeaderCell>
                  <TableHeaderCell>ACTION</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {buildings &&
                  selectedBuilding?.Restaurant.map((restaurant) => (
                    <TableRow key={restaurant.id}>
                      <TableCell>{restaurant.id}</TableCell>
                      <TableCell>{restaurant.name}</TableCell>
                      <TableCell>
                        <button  
                                                      className="border px-2 rounded  bg-secondary text-white"
                        onClick={() => handleEditClick(restaurant)}>
                          แก้ไข
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
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
                          <div>
                            แก้ไขร้านค้า เลขที่ {selectedRestaurant?.name}
                          </div>
                        </Dialog.Title>

                        <div className="mt-5 justify-center text-center">
                            <input
                              className="border p-2 rounded mb-4"
                              type="text"
                              value={newName}
                              onChange={handleNameChange}
                            />
                            <br />
                            <button
                              className="border p-2 rounded mb-4 bg-indigo-500 text-white"
                              onClick={handleConfirmClick}
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
          </div>
        </div>
      </div>
      <Navbottom />    
      </>
      )}
      
    </div>
    
  );
}
