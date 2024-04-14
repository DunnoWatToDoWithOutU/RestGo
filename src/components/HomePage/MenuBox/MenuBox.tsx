"use client";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { AddPeoplePopup } from "./AddPeoplePopup";
import { CheckInPopup } from "./CheckInPopup";
import dayjs, { Dayjs } from "dayjs";
import { CheckOutPopup } from "./CheckOutPopup";

export function MenuBox() {
  //const [showCalendar, setShowCalendar] = useState(false);
  const [showAddPeople, setShowAddPeople] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const addPeopleButtonRef = useRef(null);

  const [showCheckInPopup, setShowCheckInPopup] = useState(false);
  const [checkInDate, setCheckInDate] = useState(dayjs().format("DD/MM/YYYY"));
  const [isSubmittedCheckIn, setIsSubmittedCheckIn] = useState(false);

  const [showCheckOutPopup, setShowCheckOutPopup] = useState(false);
  const [checkOutDate, setCheckOutDate] = useState(
    dayjs().format("DD/MM/YYYY")
  );
  const [isSubmittedCheckOut, setIsSubmittedCheckOut] = useState(false);

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
    setShowCheckOutPopup(false);
    setShowCheckInPopup(true);
  };

  const handleCheckOut = () => {
    setShowCheckOutPopup(true);
    setShowAddPeople(false);
    setShowCheckInPopup(false);
  };

  const handleAddPeople = () => {
    // console.log("Add people clicked");
    //setShowCalendar(false);
    setShowAddPeople(true);
    setShowCheckInPopup(false);
    setShowCheckOutPopup(false);
  };

  const handleCloseAddPeople = () => {
    setShowAddPeople(false);
  };

  const handleCloseCheckInPopup = () => {
    setShowCheckInPopup(false);
  };

  const handleCloseCheckOutPopup = () => {
    setShowCheckOutPopup(false);
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
            <p className="mx-auto font-semibold">
              {isSubmittedCheckIn ? `${checkInDate}` : "Check In"}
            </p>
            <div
              className="h-5 w-5 mx-auto mt-1 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/img/checkin.png)` }}
            ></div>
          </button>
          <div className="w-[0.105rem] h-[80%] my-auto bg-[#15439C]"></div>
          {showCheckInPopup && (
            <div className="absolute top-[50%] right-5 z-50">
              <CheckInPopup
                onClose={handleCloseCheckInPopup}
                onChange={(newDate: string) => {
                  setCheckInDate(newDate);
                  setIsSubmittedCheckIn(true);
                }}
              />
            </div>
          )}

          <button
            className="h-full hover:bg-zinc-50 w-[50%] text-sm"
            onClick={handleCheckOut}
          >
            <p className="mx-auto font-semibold">
              {isSubmittedCheckOut ? `${checkOutDate}` : "Check Out"}
            </p>
            <div
              className="h-5 w-5 mx-auto mt-1 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/img/checkout.png)` }}
            ></div>
          </button>
          {showCheckOutPopup && (
            <div className="absolute top-[50%] right-5 z-50">
              <CheckOutPopup
                onClose={handleCloseCheckOutPopup}
                onChange={(newDate: string) => {
                  setCheckOutDate(newDate);
                  setIsSubmittedCheckOut(true);
                }}
              />
            </div>
          )}
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
            {isSubmitted
              ? `${
                  peopleValues.adults +
                  peopleValues.children +
                  peopleValues.babies
                } People, ${peopleValues.rooms} Rooms`
              : "Add People"}
          </p>
        </button>
        {showAddPeople && (
          <div className="absolute top-[50%] right-5 z-50">
            <AddPeoplePopup
              onClose={handleCloseAddPeople}
              onSubmit={handlePeopleSubmit}
            />
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
      <button className=" absolute left-[28%] hover:bg-primary_dark -bottom-5 text-white bg-primary px-24 rounded-lg p-1 text-xl">
        Search Here
      </button>
    </div>
  );
}
