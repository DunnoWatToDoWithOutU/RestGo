'use client'
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { toast } from 'sonner';

export const CheckInCheckOutPopup: React.FC<{
  menuCheckInDate:Dayjs
  menuCheckOutDate:Dayjs
  onClose: () => void; 
  onChange1: (values: any) => void ; 
  onChange2: (values: any) => void }> = ({ onClose, onChange1, onChange2 ,menuCheckInDate,menuCheckOutDate }) => {

  const [isSubmittedCheckIn, setIsSubmittedCheckIn] = useState(false);
  const [isSubmittedCheckOut, setIsSubmittedCheckOut] = useState(false);
  const [checkInDate, setCheckInDate] = useState(menuCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState(menuCheckOutDate);

  var relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)

  const checkCheckInDate = (newDateIn:any) =>{
    var x = (newDateIn.fromNow()).substr(-3);
    if(x==="ago"){
      toast.error("Wrong Date");
    }
    else{
      setIsSubmittedCheckIn(true)
      setCheckInDate(newDateIn)
      onChange1(newDateIn)
    }
  }

  const checkCheckOutDate = (newDateOut:any) =>{
    var y = (newDateOut.from(checkInDate)).substr(-3);

    if(y==="ago"){
      toast.error("Wrong Date");
    }
    else{
      if(isSubmittedCheckIn===false){
        toast.error("Please Insert Check-In Date");
      }
      else{
        setIsSubmittedCheckOut(true)
        setCheckOutDate(newDateOut)
        onChange2(newDateOut)
        onClose();
      }
    }
  }

  const closeCheck = (newDateIn:any,newDateOut:any) =>{
    var z = (newDateOut.from(newDateIn)).substr(-3);
    console.log(z);
    if(z==="ago"){
      toast.error("Wrong Date");
    }
    else{
      setIsSubmittedCheckIn(true)
      setCheckInDate(newDateIn)
      onChange1(newDateIn)
      onClose();
    }
  }

  return (
    <div className="inset-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-7">
        <button
          className="absolute top-2 right-2 text-blue-500 hover:text-[#15439C] focus:outline-none transition-all duration-200"
          onClick={()=>closeCheck(checkInDate,checkOutDate)}
        >
          <svg
            className="h-6 w-6l"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        
        <div>
        <h2 className="text-xl font-bold mb-2">Check-In&Check-Out Date</h2>
        <div className='flex flex-row p-1'>
          <div className='border'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={checkInDate}
                  onChange={(newDateIn)=>checkCheckInDate(newDateIn)}/>
              </LocalizationProvider>
            </div>
            <div className='border'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={checkOutDate}
                  onChange={(newDateOut)=>checkCheckOutDate(newDateOut)}/>
              </LocalizationProvider>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};
