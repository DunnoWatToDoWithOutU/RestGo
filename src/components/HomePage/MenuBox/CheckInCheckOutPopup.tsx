'use client';
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { toast } from 'sonner';

export const CheckInCheckOutPopup: React.FC<{
  menuCheckInDate: Dayjs;
  menuCheckOutDate: Dayjs;
  onClose: () => void;
  onChange1: (values: any) => void;
  onChange2: (values: any) => void;
}> = ({ onClose, onChange1, onChange2, menuCheckInDate, menuCheckOutDate }) => {
  const [checkInDate, setCheckInDate] = useState(menuCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState(menuCheckOutDate);

  var useHandleCheckInDateChange = false;
  var useHandleCheckOutDateChange = false;

  const setDefault = () =>{
    useHandleCheckInDateChange = false;
    useHandleCheckOutDateChange = false;
  }

  const relativeTime = require('dayjs/plugin/relativeTime');
  dayjs.extend(relativeTime);

  const checkDateValidity = (newDateIn: any, newDateOut: any) => {
    var checkInAgo = newDateIn.fromNow().substr(-3);
    var checkOutAgo = newDateOut.from(newDateIn).substr(-3);
    
    if(useHandleCheckInDateChange && useHandleCheckOutDateChange){
      if (checkOutAgo === 'ago' || checkInAgo === 'ago') {
        toast.error('Wrong Date');
        setDefault;
        return false;
      }
      setDefault;
      return true;
    }
    else if(useHandleCheckInDateChange){
      if (checkInAgo === 'ago'){
        toast.error('Wrong Date');
        setDefault;
        return false;
      }
      setDefault;
      return true;
    }
    else if(useHandleCheckOutDateChange){
      if (checkOutAgo === 'ago') {
        toast.error('Wrong Date');
        setDefault;
        return false;
      }
      setDefault;
      return true;
    }
  };

  const handleCheckInDateChange = (newDateIn: any) => {
    useHandleCheckInDateChange = true;
    useHandleCheckOutDateChange = false;
    if (checkDateValidity(newDateIn, checkOutDate)) {
      setCheckInDate(newDateIn);
      onChange1(newDateIn);
    }
  };

  const handleCheckOutDateChange = (newDateOut: any) => {
    useHandleCheckInDateChange = false;
    useHandleCheckOutDateChange = true;
    if (checkDateValidity(checkInDate, newDateOut)) {
      setCheckOutDate(newDateOut);
      onChange2(newDateOut);
      onClose();
    }
  };

  const handleClose = () => {
    useHandleCheckInDateChange = true;
    useHandleCheckOutDateChange = true;
    if (checkDateValidity(checkInDate, checkOutDate)) {
      onChange1(checkInDate);
      onClose();
    }
  };

  return (
    <div className="inset-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-7">
        <button
          className="absolute top-2 right-2 text-blue-500 hover:text-[#15439C] focus:outline-none transition-all duration-200"
          onClick={handleClose}
        >
          <svg
            className="h-6 w-6l"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div>
          <h2 className="text-xl font-bold mb-2">Check-In&Check-Out Date</h2>
          <div className="flex flex-row p-1">
            <div className="border">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={checkInDate} onChange={handleCheckInDateChange} />
              </LocalizationProvider>
            </div>
            <div className="border">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={checkOutDate} onChange={handleCheckOutDateChange} />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
