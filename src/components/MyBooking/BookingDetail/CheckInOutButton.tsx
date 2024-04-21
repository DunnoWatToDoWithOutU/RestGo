export default function CheckInOutButton({ status, handleCheckedIn, handleCheckedOut }
  :{status:string,handleCheckedIn:Function,handleCheckedOut:Function}){
    return (
      <div className="w-full text-[#15439C] border-[3px] rounded-2xl p-7 relative border-[#15439C] my-5">
        <div className="absolute left-10 -top-5 px-4 bg-white text-2xl text-[#15439C] font-bold">
          Check-In & Check-Out
        </div>
        <div>
          {status === "pending" && (
            <button
              className=" bg-[#2465E2] text-white font-bold rounded-md px-5 py-2 mt-5"
              onClick={()=>handleCheckedIn()}
            >
              Check-In
            </button>
          )}
          {status === "checkedIn" && (
            <button
              className=" bg-[#2465E2] text-white font-bold rounded-md px-5 py-2 mt-5"
              onClick={()=>handleCheckedOut()}
            >
              Check-Out
            </button>
          )}
          {status === "checkedOut" && (
            <div className=" bg-[#e22424] text-white font-bold rounded-md px-5 py-2 mt-5">
              Already Check-Out
            </div>
          )}
        </div>
      </div>
    );
  }
  