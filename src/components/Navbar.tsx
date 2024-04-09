import Link from "next/link";

export function NavBar() {
  return (
    <div className="w-full h-16 px-[10%] bg-white shadow-md flex items-center justify-between">
      <div
        className="h-12 w-12 rounded-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/logo.png)` }}
      ></div>
      <div className="flex space-x-2">
        <Link
          href="/"
          className="font-bold text p-2 px-4 transition-colors duration-200 bg-[#fafafa] hover:bg-[#f1f2ff] shadow-md rounded-full text-primary"
        >
          Transporation
        </Link>
        <Link
          href="/"
          className="font-bold text p-2 px-4 transition-colors duration-200 bg-[#fafafa] hover:bg-[#f1f2ff] shadow-md rounded-full text-primary"
        >
          Hotel List
        </Link>
      </div>
      <div className="flex space-x-2">
        <button
          className="w-7 h-7 hover:scale-110 transition-all duration-200 rounded-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/img/bell.png)` }}
        ></button>
        <button
          className="w-7 hover:scale-110  transition-all duration-200 h-7 rounded-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/img/user.png)` }}
        ></button>
      </div>
    </div>
  );
}
