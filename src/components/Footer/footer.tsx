import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#160C28] text-white py-6 mt-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
          {/* Logo */}
          <Image 
            src="/logo.png" 
            alt="Logo" 
            className="mx-6"
            width={70}
            height={70}
            />
          {/* Description */}
          <p className="text-sm"
            >Rest GO<br/> Welcome to REST GO. We will get you to rest in piece.
            </p>
        </div>
        <div className="text-sm text-gray-500">
          {/* Copyright */}
          <p>&copy; 2024 DunnoWatToDoWithOutU. All rights reserved.</p>
          {/* License */}
          <p>Website content licensed under {" "}
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              className="text-blue-500 hover:underline hover:text-blue-700 opacity-80"
              >
               CC BY-NC-SA 4.0
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
