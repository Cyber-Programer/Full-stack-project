import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const Nav = ({ data }) => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  async function Logout() {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      res.status == 200 ? navigate("/login") : "";
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div className="w-full h-[280px] relative overflow-hidden flex flex-col z-10">
      {/* Main nav */}
      <div className="w-full h-full bg-[#040612ec] px-4 py-5 ">
        <div className="flex justify-between relative z-20">
          {/* Logo */}
          <Link to="/dashboard">
            <img src="/assets/logo.svg" alt="Logo" />
          </Link>

          {/* Profile section */}
          <div
            className="text-white relative"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <div className="flex gap-2 items-center cursor-pointer">
              <CgProfile className="text-3xl" />
              <h3 className="hidden md:block text-2xl font-medium">
                {data.user.name}
              </h3>
              <IoMdArrowDropdown className="text-2xl" />
            </div>

            {/* Dropdown menu */}
            {openMenu && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 text-gray-800 z-50">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 hover:text-green-700 hover:bg-gray-100 flex justify-start items-center gap-5"
                >
                  <FaTasks />
                  tasklist
                </Link>
                <Link
                  to="/spin"
                  className="block px-4 py-2 hover:text-green-700 hover:bg-gray-100 flex justify-start items-center gap-5"
                >
                  <ImSpinner9 />
                  Spin
                </Link>
                <button
                  className="w-full text-left px-4 py-2 hover:text-green-700 hover:bg-gray-100 flex justify-start items-center gap-5"
                  onClick={Logout}
                >
                  <RiLogoutCircleLine />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-full mt-10 px-5 md:px-7 flex flex-col gap-5">
          <h2 className="text-white font-semibold text-xl capitalize  ">
            Hi <span className="text-[#60E5AE]">{data.user.name}</span>{" "}
          </h2>
          <h1 className="text-white text-2xl md:text-4xl font-semibold">
            Welcome to Dashboard
          </h1>
        </div>
      </div>

      {/* Background graphics */}
      <div className="absolute top-[-7rem] md:top-[-5rem] left-[-21rem] md:left-[-24rem] rotate-200 rounded-full filter blur-lg z-0">
        <img
          src="/assets/navLeft.svg"
          alt="Background Left"
          className="rounded-full filter blur-lg"
        />
      </div>
      <div className="absolute top-[-8rem] right-[-22rem] z-0">
        <img
          src="/assets/navRight.svg"
          className="opacity-50"
          alt="Right Background"
        />
      </div>
    </div>
  );
};

export default Nav;
