export default function CheckInOutButton({ status, handleCheckedIn, handleCheckedOut }
  :{status:string,handleCheckedIn:Function,handleCheckedOut:Function}){
    return (
      <div>
          {status === "pending" && (
            <button
              className=" bg-[#2465E2] text-white text-center font-bold rounded-md px-5 py-2 drop-shadow-sm"
              onClick={()=>handleCheckedIn()}
            >
              Check-In
            </button>
          )}
          {status === "checkedIn" && (
            <button
              className=" bg-[#2465E2] text-white text-center font-bold rounded-md px-5 py-2 drop-shadow-sm"
              onClick={()=>handleCheckedOut()}
            >
              Check-Out
            </button>
          )}
          {status === "checkedOut" && (
            <div className=" bg-[#e22424] text-white text-center font-bold rounded-md px-5 py-2">
              Already Check-Out
            </div>
          )}
      </div>
    );
  }
  