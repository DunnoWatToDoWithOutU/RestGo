import React, { useState } from 'react';

// export const AddPeoplePopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
export const AddPeoplePopup: React.FC<{ onClose: () => void; onSubmit: (values: any) => void }> = ({ onClose, onSubmit }) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAdultsChange = (operation: 'add' | 'subtract') => {
    setAdults((prevAdults) => {
      if (operation === 'add') {
        return prevAdults + 1;
      } else {
        return prevAdults > 1 ? prevAdults - 1 : 1;
      }
    });
  };

  const handleChildrenChange = (operation: 'add' | 'subtract') => {
    setChildren((prevChildren) => {
      if (operation === 'add') {
        return prevChildren + 1;
      } else {
        return prevChildren > 0 ? prevChildren - 1 : 0;
      }
    });
  };

  const handleBabiesChange = (operation: 'add' | 'subtract') => {
    setBabies((prevBabies) => {
      if (operation === 'add') {
        return prevBabies + 1;
      } else {
        return prevBabies > 0 ? prevBabies - 1 : 0;
      }
    });
  };

  const handleRoomsChange = (operation: 'add' | 'subtract') => {
    setRooms((prevRooms) => {
      if (operation === 'add') {
        return prevRooms + 1;
      } else {
        return prevRooms > 1 ? prevRooms - 1 : 1;
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = { adults, children, babies, rooms };
    onSubmit(values);
    onClose();
    setIsSubmitted(true);

    // ... (existing console logs)
    console.log('Adults:', adults);
    console.log('Children:', children);
    console.log('Babies:', babies);
    console.log('Rooms:', rooms);
    console.log('Is Submitted:', isSubmitted);
    // Close the popup
  };

  return (
    <div className="inset-0 flex flex-col items-center justify-center z-50 bg-white rounded-lg shadow-lg">
        <div className="flex self-end pr-2 pt-2 ">
          <button
            className=' text-blue-500 hover:text-[#15439C] focus:outline-none transition-all duration-200'
            onClick={onClose}
          >
            <svg
              className="h-6 w-6"
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
        </div>
      {/* <div className="bg-white rounded-lg shadow-lg p-8 pt-0"> */}
        <div className='p-8 pt-0'>
        <h2 className="text-xl font-bold mb-4">
          Add People 
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center flex-row space-x-4">
            <label htmlFor="adults" className="block font-semibold mr-4">
              Adults
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleAdultsChange('subtract')}
                className="bg-blue-500 hover:bg-[#15439C] text-white font-bold py-2 px-4 rounded-l-lg transition-all duration-200"
              >
                -
              </button>
              <span className="bg-white text-[#15439C] font-bold py-2 px-4">{adults}</span>
              <button
                type="button"
                onClick={() => handleAdultsChange('add')}
                className="bg-blue-500 hover:bg-[#15439C] text-white font-bold py-2 px-4 rounded-r-lg transition-all duration-200"
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-4 flex items-center ">
            <label htmlFor="children" className="block font-semibold mr-4">
              Children
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleChildrenChange('subtract')}
                className="bg-blue-500 hover:bg-[#15439C] text-white font-bold py-2 px-4 rounded-l-lg transition-all duration-200"
              >
                -
              </button>
              <span className="bg-white text-[#15439C] font-bold py-2 px-4">{children}</span>
              <button
                type="button"
                onClick={() => handleChildrenChange('add')}
                className="bg-blue-500 hover:bg-[#15439C] text-white font-bold py-2 px-4 rounded-r-lg transition-all duration-200" 
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-4 flex items-center space-x-3">
            <label htmlFor="babies" className="block font-semibold mr-4">
              Babies
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleBabiesChange('subtract')}
                className="bg-blue-500 hover:bg-[#15439C] text-white font-bold py-2 px-4 rounded-l-lg transition-all duration-200"
              >
                -
              </button>
              <span className="bg-white text-[#15439C] font-bold py-2 px-4">{babies}</span>
              <button
                type="button"
                onClick={() => handleBabiesChange('add')}
                className="bg-blue-500 hover:bg-[#15439C] text-white font-bold py-2 px-4 rounded-r-lg transition-all duration-200"
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-4 flex items-center space-x-3">
            <label htmlFor="rooms" className="block font-semibold mr-4">
              Rooms
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleRoomsChange('subtract')}
                className="bg-blue-500 hover:bg-[#15439C] text-white font-bold py-2 px-4 rounded-l-lg transition-all duration-200"
              >
                -
              </button>
              <span className="bg-white text-[#15439C] font-bold py-2 px-4">{rooms}</span>
              <button
                type="button"
                onClick={() => handleRoomsChange('add')}
                className="bg-blue-500 hover:bg-[#15439C] text-white font-bold py-2 px-4 rounded-r-lg transition-all duration-200"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};