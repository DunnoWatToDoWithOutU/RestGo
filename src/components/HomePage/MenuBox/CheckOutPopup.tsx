// CheckInPopup.tsx
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export const CheckOutPopup: React.FC<{ onClose: () => void; onChange: (values: any) => void }> = ({ onClose, onChange }) => {
  const [isSubmittedCheckOut, setIsSubmittedCheckOut] = useState(false);
  const [checkOutDate, setCheckOutDate] = useState(dayjs());

  return (
    <div className="inset-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-7 mr-[6rem]">
        <button
          className="absolute top-2 right-2 text-blue-500 hover:text-[#15439C] focus:outline-none transition-all duration-200"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6 mr-[6rem]"
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
        <h2 className="text-xl font-bold mb-2">Check-Out Date</h2>
          <div className='border'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar value={checkOutDate} onChange={(newDate)=>{
                setCheckOutDate(newDate)
                setIsSubmittedCheckOut(true)
                onChange(newDate.format('DD/MM/YYYY'))
                onClose()
                }}/>
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
