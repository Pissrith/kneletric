"use client";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import config from "../../../../config";
import Link from "next/link";
type BillType = {
  id: number;
  Date: Date;
  start: number;
  end: number;
  sch: number;
  mea: number;
  Restaurantid: number;
};
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@tremor/react";
import Nav from "@/components/Nav";
export default function UpdateUser({ params }: { params: { id?: string[] } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [bill, setBill] = useState<BillType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<BillType | null>(
    null
  );

  const [newName, setNewName] = useState("");
  const handleNameChange = (event: any) => {
    setNewName(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${config.api_path}/getbillrestaurant/${params.id}`
        );
        setBill(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleEditClick = (restaurant: any) => {
    console.log(restaurant);
    setSelectedRestaurant(restaurant);
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }
  const [formData, setFormData] = useState({
    id: selectedRestaurant?.id,
    Date: selectedRestaurant?.Date,
    start: selectedRestaurant?.start,
    end: selectedRestaurant?.end,
    mea: selectedRestaurant?.mea,
    sch: selectedRestaurant?.sch,
    Restaurantid: selectedRestaurant?.Restaurantid,
  });

  useEffect(() => {
    setFormData({
      id: selectedRestaurant?.id,
      Date: selectedRestaurant?.Date,
      start: selectedRestaurant?.start,
      end: selectedRestaurant?.end,
      mea: selectedRestaurant?.mea,
      sch: selectedRestaurant?.sch,
      Restaurantid: selectedRestaurant?.Restaurantid,
    });
  }, [selectedRestaurant]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.target.value;

    // Convert the value to a number if the input name is not 'Date'
    if (e.target.name !== "Date") {
      value = parseFloat(value);
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleConfirmClick = async () => {
    try {
      if (formData.Date) {
        const date = new Date(formData.Date);
        const formattedDate = date.toISOString();

        const updatedFormData = {
          ...formData,
          Date: formattedDate,
        };

        const response = await fetch(config.api_path + "/updatebillres", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        });

        if (!response.ok) {
          throw new Error("An error occurred while updating the restaurant.");
        }
        closeModal();
        alert("Bill updated successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      try {
        const id = selectedRestaurant?.id; // replace this with the actual id
        const response = await axios.delete(
          `${config.api_path}/deletebill/${id}`
        );
        if (response.status === 200) {
          alert("Bill deleted successfully");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-background h-screen">

        <Nav />
    <div className="flex flex-col flex-wrap  items-center mb-16 lg:mb-0 justify-center bg-background  ">
      <div className="w-full max-w-2xl p-4 space-y-6 bg-white border rounded-sm">
        <div className=" text-sm mx-auto w-full max-w-3xl">
            <h1 className="text-center text-lg mb-1 text-text">ตารางค่าไฟของร้านเลขที่ <span className="underline"> {params.id}</span></h1>
          <Table className=" md:w-full">
            <TableHead>
              <TableRow>
                <TableHeaderCell>วันที่</TableHeaderCell>
                <TableHeaderCell>หน่วยเริ่ม </TableHeaderCell>
                <TableHeaderCell>หน่วยท้าย</TableHeaderCell>
                <TableHeaderCell>หน่วยการไฟฟ้า</TableHeaderCell>
                <TableHeaderCell>หน่วยโรงเรียน</TableHeaderCell>
                <TableHeaderCell></TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bill.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    ไม่มีข้อมูล
                  </TableCell>
                </TableRow>
              ) : (
                bill.map((billid: any) => (
                  <TableRow key={billid.id}>
                    <TableCell>{billid.Date}</TableCell>
                    <TableCell>{billid.start}</TableCell>
                    <TableCell>{billid.end}</TableCell>
                    <TableCell>{billid.mea}</TableCell>
                    <TableCell>{billid.sch}</TableCell>
                    <TableCell>
                      <button
                        className="border rounded px-2 bg-indigo-500 text-center text-white"
                        onClick={() => handleEditClick(billid)}
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={handleDelete}
                        className="border px-2 mx-1 rounded  bg-primary text-white"
                      >
                        ลบ
                      </button>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
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
                        แก้ไขร้านค้า เลขที่ {selectedRestaurant?.id}
                      </Dialog.Title>

                      <div className="mt-5 justify-center text-center">
                        <div className="grid grid-cols-2 my-1 items-center">
                          <label htmlFor="">วันที่</label>
                          <input
                            type="date"
                            id="Date"
                            name="Date"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="grid grid-cols-2  my-1 items-center">
                          <label htmlFor="">หน่วยเริ่ม</label>
                          <input
                            className="border rounded"
                            name="start"
                            value={formData.start}
                            onChange={handleChange}
                            type="number"
                          />{" "}
                        </div>
                        <div className="grid grid-cols-2  my-1 items-center">
                          <label htmlFor="">หน่วยท้าย</label>
                          <input
                            className="border rounded"
                            name="end"
                            value={formData.end}
                            onChange={handleChange}
                            type="number"
                          />{" "}
                        </div>
                        <div className="grid grid-cols-2  my-1 items-center">
                          <label htmlFor="">หน่วยการไฟฟ้า</label>
                          <input
                            className="border rounded"
                            name="mea"
                            value={formData.mea}
                            onChange={handleChange}
                            type="number"
                          />{" "}
                        </div>
                        <div className="grid grid-cols-2  my-1 items-center">
                          <label htmlFor="">หน่วยโรงเรียน</label>
                          <input
                            className="border rounded"
                            name="sch"
                            value={formData.sch}
                            onChange={handleChange}
                            type="number"
                          />{" "}
                        </div>
                        <br />
                        <button
                          onClick={handleConfirmClick}
                          className="border rounded mb-4 bg-indigo-500 px-2 py-1 text-white"
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
    </div>
  );
}
