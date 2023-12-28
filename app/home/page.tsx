"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

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
  Restaurantid: number;
};
function Page() {
  const [buildings, setBuildings] = useState<BuildingType[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(
    null
  );
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantType | null>(null);
  const [selectedBill, setSelectedBill] = useState<BillType | null>(null);

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


  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedRestaurant) return;
    const newBill = {
      Restaurantid: selectedRestaurant.id,
      Date: new Date(),
      start,
      end
    };
    try {
      const response = await axios.post('http://localhost:3003/bill/', newBill);
      // Refresh the data after adding the new bill
      await fetchData();
      // Set the selected bill to the new bill
      setSelectedBill(response.data);
      // Update the selected restaurant with the new bill
      const updatedRestaurant = { ...selectedRestaurant };
      updatedRestaurant.Bill = [...updatedRestaurant.Bill, response.data];
      setSelectedRestaurant(updatedRestaurant);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <>
      <div>
        <select onChange={handleBuildingChange}>
          {buildings.map((b, index) => (
            <option key={index} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        {selectedBuilding && (
          <select onChange={handleRestaurantChange}>
            {selectedBuilding.Restaurant.map((r, index) => (
              <option key={index} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        )}
        {selectedRestaurant && (
          <select onChange={handleBillChange}>
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
        )}
        {selectedBill && (
          <div>
            <h2>
              Start: {selectedBill.start}, End: {selectedBill.end}
            </h2>
          </div>
        )}
      </div>
      <div>
      {/* ... rest of the code */}
      {selectedRestaurant && (
        <form onSubmit={handleSubmit}>
          <input type="number" value={start} onChange={handleStartChange} />
          <input type="number" value={end} onChange={handleEndChange} />
          <button type="submit">Add new bill</button>
        </form>
      )}
    </div>
    </>
  );
}

export default Page;
