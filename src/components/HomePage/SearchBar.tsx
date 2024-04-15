import Image from 'next/image'; 

export function SearchBar() {
  return (
    <div className="relative flex items-center">
      <input
        id="search-input"
        className="shadow-xl w-[30rem] h-10 p-2 px-4 focus:outline-primary_dark focus:border-[3px] my-7 mx-auto bg-white border-primary border-2 rounded-full"
        placeholder="Search hotel"
      />
      <button className="absolute top-1/2 transform -translate-y-1/2 right-4 py-2">
        <Image
          src={`/icon/searchIcon.png`}
          alt="search Icon"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}
