import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Poster from "../components/Poster";
import {
  FaShirtsinbulk,
  FaAudible,
  FaArrowRightFromBracket,
  FaBottleWater,
} from "react-icons/fa6";
import {
  FaMoneyBill,
  FaServicestack,
  FaWeibo,
  FaAlgolia,
} from "react-icons/fa";
import { getCurentUser } from "../redux/features/auth";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState({});
  const isAdmin = currentUser.role?.roleName == "admin";
 
  function formatDate(dateString) {
    if (dateString) {
      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = new Date(dateString).toLocaleDateString(
        "en-US",
        options
      );
      const [month, day, year] = formattedDate.split("/");
      return `${day}/${month}/${year}`;
    }
    return "";
  }
  useEffect(() => {
    dispatch(getCurentUser()).unwrap().then(res => {
      
      setCurrentUser(res.user);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const formatStringWithCommas = (numberString) => {
    const parts = numberString?.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };
  
  return (
    <>
      <div className="cube-container -ml-4 - z-40 flex -mt-2 h-10  items-center gap-x-1 px-4  sm:gap-x-2 sm:px-6 lg:px-4">
        <h1 className="font-bold text-xl">Welcome to</h1>
        <span className="bg-red-500 w-5 h-5 flex items-center justify-center text-white mr-0 font-bold face front right back">
          G
        </span>
        <span className="bg-yellow-500 w-5 h-5 flex items-center justify-center text-white font-bold face front right back -ml-2">
          A
        </span>
        <span className="bg-green-500 w-5 h-5 flex items-center justify-center text-white font-bold face front right back -ml-2">
          S
        </span>
        <h1 className="font-bold text-xl">AI Audit Solutions!</h1>
      </div>

    {isAdmin ? (
      <div>
        <div className="flex justify-between items-start mt-4 mr-4">
        
      </div>
      <div className="flex justify-end mt-2 mr-4 relative">
        <Link to="/dashboard/orgtransactions">
          <button className="font-medium bg-green-700 px-[0.8rem] py-[0.15rem] text-green-200">
            Summary
          </button>
        </Link>

      </div>

      <h1 className="font-bold -mb-3">Total Liability Submitted</h1>
      <div className="flex border-l-4 border-l-green-700 justify-between gap-2 flex-wrap mt-4 py-8 -lg card">
        <div className="flex flex-col justify-center items-center -ml-2">
          <p className="text-[10px] font-bold ml-0">
            CENTRAL GOVT <sup className="text-[8px] text-red-600">[0]</sup>
          </p>
          <p>
            <span className="text-[12px] font-semibold">GH₵ 0.00</span>
          </p>
          <Link to="" className="text-[10px] text-blue-400">
            view details
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="text-[10px] font-bold">
            IGF <sup className="text-[8px] text-red-600">[0]</sup>
          </p>
          <p>
            <span className="text-[12px] font-semibold">GH₵ 0.00</span>
          </p>
          <Link to="" className="text-[10px] text-blue-400">
            view details
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="text-[10px] font-bold">
            DONOR
            <sup className="text-[8px] text-red-600">[0]</sup>
          </p>
          <p>
            <span className="text-[12px] font-semibold">GH₵ 0.00</span>
          </p>
          <Link to="" className="text-[10px] text-blue-400">
            view details
          </Link>
        </div>

        {/* <div className="flex flex-col justify-center items-center">
          <p className="text-[10px] font-bold ml-2">
            STATUTORY
            <sup className="text-[8px] text-red-600">[0]</sup>
          </p>
          <p>
            <span className="text-[12px] font-semibold">GH₵ 0.00</span>
          </p>
          <Link to="" className="text-[10px] text-blue-400">
            view details
          </Link>
        </div> */}
      </div>

      {/*Second row */}
      <div className="mt-4">
        <h1 className="font-bold mb-1">Expenditure Type</h1>
        <div className="flex border-l-2 justify-between gap-2 flex-wrap py-8 -lg card ">
          <div className="flex flex-col justify-center items-center ml-2">
            <div className="bg-black bg-opacity-10 rounded-full w-[27px] h-[27px] inline-flex items-center justify-center">
              <FaWeibo size={15} className="text-blue-600" />
            </div>
            <p className="text-[10px] font-bold">
              WORKS
              <sup className="text-green-600 text-[8px]">[0]</sup>
            </p>
            <p>
              <span className="text-[12px] font-semibold">GH₵ 0.00</span>
            </p>
            <Link to="" className="text-[10px] text-blue-400">
              view details
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center ml-6">
            <div className="bg-black bg-opacity-[0.1] rounded-full w-[27px] h-[27px] inline-flex items-center justify-center">
              <FaShirtsinbulk size={15} className="text-blue-600" />
            </div>
            <p className="text-[10px] font-bold">
              GOODS
              <sup className="text-green-600 text-[8px]"> [0]</sup>
            </p>
            <p>
              <span className="text-[12px] font-semibold">GH₵ 0.00</span>
            </p>
            <Link to="" className="text-[10px] text-blue-400">
              view details
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center ml-1">
            <div className="bg-black bg-opacity-10 rounded-full w-[27px] h-[27px] inline-flex items-center justify-center">
              <FaServicestack size={15} className="text-blue-600" />
            </div>
            <p className="text-[10px] font-bold ml-2">
              SERVICES
              <sup className="text-green-600 text-[8px]"> [0]</sup>
            </p>
            <p>
              <span className="text-[12px] font-semibold">GH₵ 0.00</span>
            </p>
            <Link to="" className="text-[10px] text-blue-400">
              view details
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="bg-black bg-opacity-10 rounded-full w-[27px] h-[27px] inline-flex items-center justify-center">
              <FaMoneyBill size={15} className="text-blue-600" />
            </div>
            <p className="text-[10px] font-bold">
              COMPENSATION
              <sup className="text-green-600 text-[8px]">[0]</sup>
            </p>
            <p>
              <span className="text-[12px] font-semibold">GH₵ 0.00</span>
            </p>
            <Link to="" className="text-[10px] text-blue-400">
              view details
            </Link>
          </div>
        </div>
      </div>

      {/*Third row */}
      <div className="mt-4 mb-2">
        <h1 className="font-bold mb-1">Validation Summary</h1>
        <div className="flex border-l-2 justify-between gap-2 flex-wrap py-8 -lg card -ml-4">
          <div className="flex flex-col justify-center items-center">
            <div className="bg-black bg-opacity-[0.1] rounded-full w-[30px] h-[30px] inline-flex items-center justify-center">
              <FaAlgolia size={18} className="text-blue-600" />
            </div>
            <p className="text-[10px] font-bold">
              NO-WORK-DONE
              <sup className="text-[8px] text-green-600">[0]</sup>
            </p>
            <p>
              <span className="text-[12px] font-semibold">GH₵ 0.00</span>
            </p>
            <Link to="" className="text-[10px] text-blue-400">
              view details
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="bg-black bg-opacity-[0.1] rounded-full w-[30px] h-[30px] inline-flex items-center justify-center">
              <FaBottleWater size={18} className="text-blue-600" />
            </div>
            <p className="text-[10px] font-bold">
              PAYMENT-MADE <span className="text-[7px]"></span>
              <sup className="text-[8px] text-green-600">[0]</sup>
            </p>
            <p>
              <span className="text-[12px] font-semibold">GH₵ 0.00</span>
            </p>
            <Link to="" className="text-[10px] text-blue-400">
              view details
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="bg-black bg-opacity-[0.1] rounded-full w-[30px] h-[30px] inline-flex items-center justify-center">
              <FaArrowRightFromBracket size={18} className="text-blue-600" />
            </div>
            <p className="text-[10px] font-bold">
              OVER-PAYMENT
              <sup className="text-[8px] text-green-600">[0]</sup>
            </p>

            <p>
              <span className="text-[12px] font-semibold">GH₵ 0.00</span>
            </p>
            <Link
              /* to={DASHBOARD_PAGES.missingblucl} */ className="text-[10px] text-blue-400"
            >
              view details
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center mr-4">
            <div className="bg-black bg-opacity-10 rounded-full w-[30px] h-[30px] inline-flex items-center justify-center">
              <FaAudible size={18} className="text-blue-600" />
            </div>
            <p className="text-[10px] font-bold">
              NO-WARRANT
              <sup className="text-[8px] text-green-600">[0]</sup>
            </p>
            <p>
              <span className="text-[12px] font-semibold">GH₵ 0.00</span>
            </p>
            <Link to="" className="text-[10px] text-blue-400">
              view details
            </Link>
          </div>
        </div>
      </div>
      </div>
    ) : (
      <div className="flex justify-center items-center w-full">
        <Poster />
      </div>
    )}
      
    </>
  );
};

export default Dashboard;
