"use client";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { AddPeoplePopup } from "./AddPeoplePopup";
import dayjs, { Dayjs } from "dayjs";
import { CheckInCheckOutPopup } from "./CheckInCheckOutPopup";
import {googleAuthorize,sendMessage} from "../../../app/api/v2/mailing/mailing";


export function MenuBox() {
  //const [showCalendar, setShowCalendar] = useState(false);
  const [showAddPeople, setShowAddPeople] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const addPeopleButtonRef = useRef(null);

  const [showCheckInCheckOutPopup, setShowCheckInCheckOutPopup] = useState(false);
  const [checkInDate, setCheckInDate] = useState(dayjs());
  const [checkOutDate, setCheckOutDate] = useState(dayjs());
  const [isSubmittedCheckIn, setIsSubmittedCheckIn] = useState(false);
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

  const handleCheckInCheckOut = () => {
    setShowAddPeople(false);
    setShowCheckInCheckOutPopup(true);
  };

  const handleAddPeople = () => {
    // console.log("Add people clicked");
    //setShowCalendar(false);
    setShowAddPeople(true);
    setShowCheckInCheckOutPopup(false);
  };

  const handleCloseAddPeople = () => {
    setShowAddPeople(false);
  };

  const handleCloseCheckInCheckOutPopup = () => {
    setShowCheckInCheckOutPopup(false);
  };

  const handleFilterClick = (filter: any) => {
    setSelectedFilter(filter === selectedFilter ? null : filter);
  };

  const mailingTest = async () => {
    await googleAuthorize().then((authResult) => {
        return sendMessage('restgo.booking@gmail.com', 'nattapon.how@gmail.com', 'Booking Confimration', 'Thankyou for booking with us. This is your confirmation ID : 0111011010. Hope you enjoy your trip an book with us RestGo again.');
    }).catch(console.error);
}


  return (
    <div className=" w-[42rem] text-[#15439C] relative p-3 px-5 rounded-md mx-auto h-40 bg-white border-2 border-primary shadow-xl transition-all duration-200 ">
      <div className=" flex">
        <div className="h-16 w-[50%] rounded-md flex bg-white border-2 border-[#26CBFC]">
          <button
            className="h-full w-[50%] rounded-lg hover:bg-zinc-100 text-sm transition-all duration-300 "
            onClick={handleCheckInCheckOut}
          >
            <p className="mx-auto font-semibold">
              {isSubmittedCheckIn ? `${checkInDate.format('DD/MM/YYYY')}` : "Check In"}
            </p>
            <div
              className="h-5 w-5 mx-auto mt-1 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/img/checkin.png)` }}
            ></div>
          </button>
          <div className="w-[0.105rem] h-[80%] my-auto bg-[#15439C]"></div>
          {showCheckInCheckOutPopup && (
            <div className="absolute top-[50%] right-5 z-50">
              <CheckInCheckOutPopup
                menuCheckInDate={checkInDate}
                menuCheckOutDate={checkOutDate}
                onClose={handleCloseCheckInCheckOutPopup}
                onChange1={(newDateIn: any) => {
                  setCheckInDate(newDateIn);
                  setIsSubmittedCheckIn(true);
                }}
                onChange2={(newDateOut: any) => {
                  setCheckOutDate(newDateOut);
                  setIsSubmittedCheckOut(true);
                }}

              />
            </div>
          )}

          <button
            className="h-full hover:bg-zinc-50 w-[50%] text-sm"
            onClick={handleCheckInCheckOut}
          >
            <p className="mx-auto font-semibold">
              {isSubmittedCheckOut ? `${checkOutDate.format('DD/MM/YYYY')}` : "Check Out"}
            </p>
            <div
              className="h-5 w-5 mx-auto mt-1 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/img/checkout.png)` }}
            ></div>
          </button>
          {showCheckInCheckOutPopup && (
            <div className="absolute top-[50%] right-5 z-50">
              <CheckInCheckOutPopup
                menuCheckInDate={checkInDate}
                menuCheckOutDate={checkOutDate}
                onClose={handleCloseCheckInCheckOutPopup}
                onChange1={(newDateIn: any) => {
                  setCheckInDate(newDateIn);
                  setIsSubmittedCheckIn(true);
                }}
                onChange2={(newDateOut: any) => {
                  setCheckOutDate(newDateOut);
                  setIsSubmittedCheckOut(true);
                }}
              />
            </div>
          )}
        </div>

        <button
          className="h-16 w-[50%] flex ml-2 hover:bg-zinc-100 bg-white border-2 relative text-center items-center border-[#26CBFC] rounded-md transition-all duration-300"
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
        <button
          className={`py-[0.125rem] text-sm px-4 rounded-full border-2 border-[#26CBFC] ${
            selectedFilter === "Hotel"
              ? "bg-[#26CBFC] text-white hover:bg-[#15439C]"
              : "bg-white hover:bg-zinc-100 transition-all duration-300"
          }`}
          onClick={() => handleFilterClick("Hotel")}
        >
          Hotel
        </button>
        <button
          className={`py-[0.125rem] text-sm px-4 rounded-full border-2 border-[#26CBFC] ${
            selectedFilter === "Hostel"
              ? "bg-[#26CBFC] text-white hover:bg-[#15439C]"
              : "bg-white hover:bg-zinc-100 transition-all duration-300"
          }`}
          onClick={() => handleFilterClick("Hostel")}
        >
          Hostel
        </button>
        <button
          className={`py-[0.125rem] text-sm px-4 rounded-full border-2 border-[#26CBFC] ${
            selectedFilter === "Home-Stay"
              ? "bg-[#26CBFC] text-white hover:bg-[#15439C]"
              : "bg-white hover:bg-zinc-100 transition-all duration-300"
          }`}
          onClick={() => handleFilterClick("Home-Stay")}
        >
          Home-Stay
        </button>
        <button
          className={`py-[0.125rem] text-sm px-4 rounded-full border-2 border-[#26CBFC] ${
            selectedFilter === "Private-stay"
              ? "bg-[#26CBFC] text-white hover:bg-[#15439C]"
              : "bg-white hover:bg-zinc-100 transition-all duration-300"
          }`}
          onClick={() => handleFilterClick("Private-stay")}
        >
          Private-stay
        </button>
      </div>
      <button onClick={mailingTest} className=" absolute left-[28%] hover:bg-primary_dark -bottom-5 text-white bg-primary px-24 rounded-lg p-1 text-xl shadow-lg">
        Search Here
      </button>
    </div>
  );
}
