import { BiPhoneCall } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function Navbar() {
  return (
    <header className="max-w-screen-2xl mx-auto container sticky top-0 bg-white border-b-[1px] border-b-stone-300">
      <div className="sm:navbar xl:px-24 p-2 sm:p-0">
        <div className="navbar-start flex flex-1 w-full justify-between">
          <div className="mr-6 sm:flex hidden">
            <img src={"./public/logo.png"} alt="logo.png" className="h-full" />
          </div>

          <div className="group flex flex-col flex-col-reverse flex-1 sm:flex-row items-start  sm:items-center cursor-pointer">
            <p className="font-light from-neutral-500 text-sm">
              choose location
            </p>
            <div className="flex items-center gap-2">
              <FaLocationDot className="sm:ml-2 text-green sm:text-slate-900 group-hover:text-green" />
              <h2 className="font-bold text-base sm:hidden">Other</h2>
            </div>
          </div>

          <button className="btn btn-ghost btn-circle mr-4 sm:hidden ">
            <FaUser />
          </button>
        </div>

        <div className="navbar-end sm:flex hidden">
          <button className="btn btn-ghost btn-circle mr-4 ">
            <FaUser />
          </button>

          <button className="btn btn-ghost btn-circle mr-4">
            {/* search */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* cart */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle mr-4"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>

          <a className="btn bg-green rounded-full px-6 text-white hidden sm:flex items-center gap-2">
            <BiPhoneCall />
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
