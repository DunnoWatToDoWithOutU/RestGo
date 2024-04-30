"use client";
import { useState } from "react";
import { format } from "date-fns";
import { AppointmnetProps, HotelProps } from "../../@types/type";

interface EditPopupProps {
  Appt: AppointmnetProps;
  Hotel?: HotelProps;
  onSave: any;
  endDate: Date;
  startDate: Date;
  setUpdateEndDate: (endDate: Date) => void;
  setUpdateStartDate: (startDate: Date) => void;
  onCancel: () => void;
}

export default function EditPopup(props: EditPopupProps) {
  const handleEndDateChange = (event: any) => {
    props.setUpdateEndDate(event.target.value);
  };
  const handleStartDateChange = (event: any) => {
    props.setUpdateStartDate(event.target.value);
  };

  // const formattedStartDate = editedAppt.startDate instanceof Date ? editedAppt.startDate.toISOString().split("T")[0] : "";
  // const formattedEndDate = editedAppt.endDate instanceof Date ? editedAppt.endDate.toISOString().split("T")[0] : "";
  const formattedStartDate = format(new Date(props.startDate), "yyyy-MM-dd");
  const formattedEndDate = format(new Date(props.endDate), "yyyy-MM-dd");

  return (
    <div className="popup-container fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="popup bg-white rounded-lg p-8 max-w-md w-full relative z-50">
        <h2 className="text-2xl font-bold mb-4">Edit Appointment Details</h2>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700">
            Start Date:
          </label>
          <input
            type="date"
            name="startDate"
            value={formattedStartDate}
            onChange={handleStartDateChange}
            className="w-full border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:border-blue-500 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-gray-700">
            End Date:
          </label>
          <input
            type="date"
            name="endDate"
            value={formattedEndDate}
            onChange={handleEndDateChange}
            className="w-full border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:border-blue-500 text-gray-700"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={props.onSave()}
            className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
          >
            Save
          </button>
          <button
            onClick={props.onCancel}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
