"use client";
import { useEffect, useRef, useState } from "react";
import { HotelProps } from "../../../@types/type";
import { HotelList } from "../HomePage/HotelList";
import SortFilter from "./SortFilter/SortFilter";
import { TagContainer } from "./TagFilter/TagContainer";
import dayjs from "dayjs";
import { AddPeoplePopup } from "../HomePage/MenuBox/AddPeoplePopup";
import { CheckInCheckOutPopup2 } from "@/components/HotelListPage/HotelListCheckInOut";
import { set } from "mongoose";
import getHotels from "@/libs/getHotels";

const filterData = [
  { value: "name", label: "Name" },
  { value: "price", label: "Price" },
  { value: "rating", label: "Rating" },
];

export function HotelListPage() {
  const [hotelData, setHotelData] = useState<HotelProps[]>([]);
  const [MaxtoMin, setMaxtoMin] = useState(false);
  const getHotelData = async () => {
    const hotels = await getHotels();
    setHotelData(hotels);
  };
  useEffect(() => {
    getHotelData();
  }, []);

  const [showAddPeople, setShowAddPeople] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("name");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const addPeopleButtonRef = useRef(null);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<HotelProps[]>(hotelData);

  const [showCheckInCheckOutPopup, setShowCheckInCheckOutPopup] =
    useState(false);
  const [checkInDate, setCheckInDate] = useState(dayjs().format("DD/MM/YYYY"));
  const [checkOutDate, setCheckOutDate] = useState(
    dayjs().format("DD/MM/YYYY")
  );
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

  useEffect(() => {
    const results = hotelData.filter((hotel) =>
      hotel.name.toLowerCase().includes(search.toLowerCase())
    );
    console.log(selectedFilter);
    let resultsFiltering = results;
    if (MaxtoMin == false) {
      results.sort((a, b) => {
        if (selectedFilter === "price") {
          return a.price - b.price;
        } else if (selectedFilter === "name") {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
        }
        return 0;
      });
    } else {
      results.sort((a, b) => {
        if (selectedFilter === "price") {
          return b.price - a.price;
        } else if (selectedFilter === "name") {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
        }
        return 0;
      });
    }
    console.log(resultsFiltering);
    setSearchResults(resultsFiltering);
  }, [search, hotelData, MaxtoMin, selectedFilter]);
  console.log(selectedFilter);
  return (
    <main className="w-full flex flex-col justify-start items-center ">
      <div className="  w-[40%] mt-10 text-center ">
        <p className=" text-3xl font-bold mb-5 text-[#15439C]">Hotel List</p>

        {/* <div className="flex justify-between items-center">
          <SearchBar></SearchBar>
          </div> */}
      </div>
      <div className="py-5 px-[10%]  w-full bg-[#15439C] flex relative">
        <div className=" w-full text-[#15439C]   px-5 rounded-md  ">
          <div className="flex">
            <div className="w-[50%] relative h-30  rounded-md flex bg-white border-2 border-primary">
              <button
                className="h-full w-[50%] rounded-lg hover:bg-zinc-100 text-sm transition-all duration-300 "
                onClick={handleCheckInCheckOut}
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
              {showCheckInCheckOutPopup && (
                <div className="absolute top-[50%] right-5 z-50">
                  <CheckInCheckOutPopup2
                    onClose={handleCloseCheckInCheckOutPopup}
                    onChange1={(newDateIn: string) => {
                      setCheckInDate(newDateIn);
                      setIsSubmittedCheckIn(true);
                    }}
                    onChange2={(newDateOut: string) => {
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
                  {isSubmittedCheckOut ? `${checkOutDate}` : "Check Out"}
                </p>
                <div
                  className="h-5 w-5 mx-auto mt-1 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(/img/checkout.png)` }}
                ></div>
              </button>
              {showCheckInCheckOutPopup && (
                <div className="absolute top-[50%] right-5 z-50">
                  <CheckInCheckOutPopup2
                    onClose={handleCloseCheckInCheckOutPopup}
                    onChange1={(newDateIn: string) => {
                      setCheckInDate(newDateIn);
                      setIsSubmittedCheckIn(true);
                    }}
                    onChange2={(newDateOut: string) => {
                      setCheckOutDate(newDateOut);
                      setIsSubmittedCheckOut(true);
                    }}
                  />
                </div>
              )}
            </div>

            <button
              className="h-16 w-[50%] flex ml-2 hover:bg-zinc-100 bg-white border-2 relative text-center items-center border-primary rounded-md transition-all duration-300"
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
        </div>
        <input
          id="search-input"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          type="text"
          placeholder="Search Hotel"
          className="h-12 text-[#15439C] my-auto w-[60rem] py-2 px-3 bg-white rounded-full focus:outline-none border-primary border-2"
        ></input>
      </div>
      <TagContainer></TagContainer>
      <SortFilter
        setFiltering={setSelectedFilter}
        setMaxtoMin={setMaxtoMin}
        MaxtoMin={MaxtoMin}
      ></SortFilter>
      <div className="w-full px-[10%]">
        <HotelList HotelData={searchResults}></HotelList>
      </div>
    </main>
  );
}
