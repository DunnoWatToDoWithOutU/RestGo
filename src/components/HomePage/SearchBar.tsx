import Image from "next/image";

export function SearchBar(props: { setSearch: (search: string) => void }) {
  return (
    <div className="relative flex items-center my-7 mx-auto justify-center">
      <input
        onChange={(event) => {
          props.setSearch(event.target.value);
        }}
        id="search-input"
        className="shadow-xl w-[30rem] h-10 p-2 px-4 focus:outline-primary_dark focus:border-[3px] bg-white border-primary border-2 rounded-full"
        placeholder="Search hotel"
      />
      <button className="absolute right-2 top-2">
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
