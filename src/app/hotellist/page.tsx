import Image from "next/image";

export default function HotelListPage() {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <div className="relative mt-1 w-[40%] mt-10">
        <input
          type="text"
          id="password"
          className="w-full px-5 py-4 border-2 rounded-full border-blue-800 hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Search..."
        >
        </input>
        <button className="absolute absolute top-1/2 right-5 -translate-x-1/2 -translate-y-1/2 hover:width-20"> <Image src={`/icon/searchIcon.png`} alt="search Icon" width={20} height={20}></Image></button>
      </div>
    </main>
  );
}
