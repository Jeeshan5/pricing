import React from "react";

const Header = ({ version }) => {
  return (
    <header className="w-full px-8 py-6 flex justify-between items-center bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 shadow-lg">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-lg tracking-wide">
        🌟 Premium Pricing
      </h1>
      <span className="px-4 py-2 text-sm font-semibold bg-white text-black rounded-full shadow-md">
        Version: {version}
      </span>
    </header>
  );
};

export default Header;
