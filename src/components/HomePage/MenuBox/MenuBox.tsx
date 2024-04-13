"use client";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { AddPeoplePopup } from "./AddPeoplePopup";

export function MenuBox() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAddPeople, setShowAddPeople] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const addPeopleButtonRef = useRef(null);

  const [peopleValues, setPeopleValues] = useState({
    adults: 1,
    children: 0,
    babies: 0,
    rooms: 1,
  });

  const handlePeopleSubmit = (values: any) => {
    setPeopleValues(values);
    setIsSubmitted(true);
  };


  const handleCheckIn = () => {
    setShowAddPeople(false);
  };

  const handleCheckOut = () => {
    setShowAddPeople(false);
  };

  const handleAddPeople = () => {
    // console.log("Add people clicked");
    setShowCalendar(false);
    setShowAddPeople(true);
  };

  const handleCloseAddPeople = () => {
    setShowAddPeople(false);
  };

  const handleFilterClick = (filter: any) => {
    setSelectedFilter(filter === selectedFilter ? null : filter);
  };

  return (
    <div className=" w-[42rem] text-[#15439C] relative p-3 px-5 rounded-md mx-auto h-40 bg-white border-2 border-primary">
      <div className=" flex">
        <div className="h-16 w-[50%] rounded-md flex bg-white border-2 border-[#26CBFC]">
          <button
            className="h-full w-[50%] hover:bg-zinc-50 text-sm"
            onClick={handleCheckIn}
          >
            CheckIn
            <div
              className="h-5 w-5 mx-auto mt-1 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/img/checkin.png)` }}
            ></div>
          </button>
          <div className="w-[0.105rem] h-[80%] my-auto bg-[#15439C]"></div>
          <button
            className="h-full hover:bg-zinc-50 w-[50%] text-sm"
            onClick={handleCheckOut}
          >
            CheckOut
            <div
              className="h-5 w-5 mx-auto mt-1 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/img/checkout.png)` }}
            ></div>
          </button>
        </div>
        <button
          className="h-16 w-[50%] flex ml-2 hover:bg-zinc-50 bg-white border-2 relative text-center items-center border-[#26CBFC] rounded-md"
          onClick={handleAddPeople}
          ref={addPeopleButtonRef}
        >
          <div
            className="h-7 w-7 bg-contain bg-center bg-no-repeat absolute left-5"
            style={{ backgroundImage: `url(/img/addpeople.png)` }}
          ></div>
          <p className="mx-auto font-semibold">
            {isSubmitted ? `${peopleValues.adults + peopleValues.children + peopleValues.babies} People, ${peopleValues.rooms} Rooms` : 'Add People'}
          </p>
        </button>
        {showAddPeople && (
          <div className="absolute top-[50%] right-5 z-50">
            <AddPeoplePopup onClose={handleCloseAddPeople} onSubmit={handlePeopleSubmit}/>
          </div>
        )}
      </div>
      <div className="flex justify-center w-full mt-5 space-x-3">
        <p
          className={`py-[0.125rem] text-sm px-4 rounded-full border-2 border-[#26CBFC] ${
            selectedFilter === "Hotel"
              ? "bg-[#26CBFC] text-white hover:bg-[#15439C]"
              : "bg-white hover:bg-zinc-50"
          }`}
          onClick={() => handleFilterClick("Hotel")}
        >
          Hotel
        </p>
        <p
          className={`py-[0.125rem] text-sm px-4 rounded-full border-2 border-[#26CBFC] ${
            selectedFilter === "Hostel"
              ? "bg-[#26CBFC] text-white hover:bg-[#15439C]"
              : "bg-white hover:bg-zinc-50"
          }`}
          onClick={() => handleFilterClick("Hostel")}
        >
          Hostel
        </p>
        <p
          className={`py-[0.125rem] text-sm px-4 rounded-full border-2 border-[#26CBFC] ${
            selectedFilter === "Home-Stay"
              ? "bg-[#26CBFC] text-white hover:bg-[#15439C]"
              : "bg-white hover:bg-zinc-50"
          }`}
          onClick={() => handleFilterClick("Home-Stay")}
        >
          Home-Stay
        </p>
        <p
          className={`py-[0.125rem] text-sm px-4 rounded-full border-2 border-[#26CBFC] ${
            selectedFilter === "Private-stay"
              ? "bg-[#26CBFC] text-white hover:bg-[#15439C]"
              : "bg-white hover:bg-zinc-50"
          }`}
          onClick={() => handleFilterClick("Private-stay")}
        >
          Private-stay
        </p>
      </div>
      <button className=" absolute left-[38%] hover:bg-primary_dark -bottom-5 text-white bg-primary px-6 rounded-lg p-1 text-xl">
        Search Here
      </button>
    </div>
  );
}
