import React from "react";

const Footer = ({ stats }) => {
  return (
    <footer className="mt-16 text-center text-gray-300 text-sm border-t border-gray-700 pt-6 w-full">
      <p>
        Total Requests: <span className="text-blue-400">{stats.total}</span> |{" "}
        Blue: <span className="text-indigo-400">{stats.blue}</span> | Green:{" "}
        <span className="text-emerald-400">{stats.green}</span>
      </p>
      <p className="mt-2 text-xs text-gray-400">
        © {new Date().getFullYear()} Premium Pricing UI
      </p>
    </footer>
  );
};

export default Footer;
