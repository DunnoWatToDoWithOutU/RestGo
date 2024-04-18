"use client";
import { useEffect, useRef, useState } from "react";
import { HotelProps } from "../../../@types/type";
import { HotelList } from "../HomePage/HotelList";
import SortFilter from "./SortFilter/SortFilter";
import { TagContainer } from "./TagFilter/TagContainer";
import dayjs from "dayjs";
import { AddPeoplePopup } from "../HomePage/MenuBox/AddPeoplePopup";
import { CheckInCheckOutPopup2 } from "@/components/HotelListPage/HotelListCheckInOut";
import getHotels from "@/libs/getHotels";

const TagData = [
  "wifi",
  "pool",
  "parking",
  "aircon",
  "breakfast",
  "kitchen",
  "pets",
  "fitness",
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

  const [showCheckInCheckOutPopup2, setShowCheckInCheckOutPopup2] =
    useState(false);
  const [checkInDate, setCheckInDate] = useState(dayjs().format("DD/MM/YYYY"));
  const [checkOutDate, setCheckOutDate] = useState(
    dayjs().format("DD/MM/YYYY")
  );
  const [isSubmittedCheckIn, setIsSubmittedCheckIn] = useState(false);
  const [isSubmittedCheckOut, setIsSubmittedCheckOut] = useState(false);

  const [selectedTags, setSelectedTags] = useState(new Array(8).fill(false));

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
    setShowCheckInCheckOutPopup2(true);
  };

  const handleAddPeople = () => {
    setShowAddPeople(true);
    setShowCheckInCheckOutPopup2(false);
  };

  const handleCloseAddPeople = () => {
    setShowAddPeople(false);
  };

  const handleCloseCheckInCheckOutPopup2 = () => {
    setShowCheckInCheckOutPopup2(false);
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
        } else if (selectedFilter === "rating") {
          return b.rating - a.rating;
        } else if (selectedFilter === "location") {
          if (a.address < b.address) {
            return -1;
          }
          if (a.address > b.address) {
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
        } else if (selectedFilter === "rating") {
          return a.rating - b.rating;
        } else if (selectedFilter === "location") {
          if (a.address > b.address) {
            return -1;
          }
          if (a.address < b.address) {
            return 1;
          }
        }
        return 0;
      });
    }
    const resultTag = resultsFiltering.filter((hotel) => {
      for (let i = 0; i < selectedTags.length; i++) {
        if (selectedTags[i] == true) {
          if (hotel.tag.includes(TagData[i]) == false) {
            return false;
          }
        }
      }
      return true;
    });
    console.log(resultsFiltering);
    setSearchResults(resultTag);
  }, [search, hotelData, MaxtoMin, selectedFilter, selectedTags]);
  console.log(selectedFilter);
  console.log(selectedTags);
  return (
    <main className="w-full flex flex-col justify-start items-center ">
      <div className="py-3 px-[10%]  w-full bg-[#15439C] flex fixed mt-6 z-50">
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
              {showCheckInCheckOutPopup2 && (
                <div className="absolute top-20 z-40">
                  <CheckInCheckOutPopup2
                    onClose={handleCloseCheckInCheckOutPopup2}
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
              <div className="absolute top-[100%] left-[34rem] z-50">
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
      {/* <div className="  w-[40%] mt-10 text-center ">
        <p className=" text-3xl font-bold mb-5 text-[#15439C]">Hotel List</p>

        <div className="flex justify-between items-center">
          <SearchBar></SearchBar>
          </div> 
      </div> */}
      <div className="mt-[8rem]"></div>
      <TagContainer
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      ></TagContainer>
      <div className="flex items-center space-x-3">
        <SortFilter
          setFiltering={setSelectedFilter}
          setMaxtoMin={setMaxtoMin}
          MaxtoMin={MaxtoMin}
        ></SortFilter>
        {/* <button className=" w-40 border-2 flex space-x-2 hover:bg-zinc-100 rounded-md border-primary px-2 py-[0.65rem]">
          <p className=" text-[#15439C] font-bold text-xl">More Filter</p>
          <div
            className="h-6 w-6 bg-cover bg-center"
            style={{ backgroundImage: `url(/img/filter.png)` }}
          ></div>
        </button> */}
      </div>
      <div className="w-full px-[10%]">
        <HotelList
          HotelData={searchResults}
          checker={search == "" && selectedTags.every((x) => x === false)}
        ></HotelList>
      </div>
    </main>
  );
}
