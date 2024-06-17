import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaShoppingBag } from "react-icons/fa";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { BiSolidOffer } from "react-icons/bi";

function Main() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between no-scrollbar" style={{ height: '100vh' }}>
      <Navbar />
      <Outlet />
      <Footer />
      <footer className="grid grid-cols-4 sticky bg-white py-4 bottom-0 border-t-2 border-b-2 border-l-neutral-300 w-full">
        <div
          className="flex items-center gap-2 flex-col"
          onClick={() => navigate("/")}
        >
          <AiFillHome
            className={`text-2xl ${pathname === "/" ? "text-green" : "text-gray-500"}`}
          />
          <p className={`text-gray-500 ${pathname === "/" && "text-slate-700 font-bold"}`}>Home</p>
        </div>
        <div
          className="flex items-center gap-2 flex-col"
          onClick={() => navigate("/offer")}
        >
          <BiSolidOffer
            className={`text-2xl ${pathname === "/offer" ? "text-green" : "text-gray-500"}`}
          />
          <p className={`text-gray-500 ${pathname === "/offer" && "text-slate-700 font-bold"}`}>Offers</p>
        </div>
        <div
          className="flex items-center gap-2 flex-col"
          onClick={() => navigate("/order")}
        >
          <FaShoppingBag
            className={`text-2xl ${pathname === "/order" ? "text-green" : "text-gray-500"}`}
          />
          <p className={`text-gray-500 ${pathname === "/order" && "text-slate-700 font-bold"}`}>Order</p>
        </div>
        <div
          className="flex items-center gap-2 flex-col"
          onClick={() => navigate("/search")}
        >
          <AiOutlineSearch
            className={`text-2xl ${pathname === "/search" ? "text-green" : "text-gray-500"}`}
          />
          <p className={`text-gray-500 ${pathname === "/search" && "text-slate-700 font-bold"}`}>Search</p>
        </div>
      </footer>
    </div>
  );
}

export default Main;
