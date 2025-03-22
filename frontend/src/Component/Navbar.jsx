import React from "react";

export default function Navbar({ onOpen, onSearch }) {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm p-4">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Client Manager</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <input
          type="text"
          placeholder="Search Clients..."
          className="input input-bordered w-48 md:w-auto"
          onChange={handleSearchChange}
        />
      </div>
      <div className="navbar-end">
        <button className="btn btn-primary" onClick={onOpen}>
          Add Client
        </button>
      </div>
    </div>
  );
}
