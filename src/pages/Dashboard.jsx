import React, { useEffect } from "react";
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
const Dashboard = () => {
  const dispatch = useDispatch();

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

  const calculateDateRange = (dates) => {
    if (!dates.min_date || !dates.max_date) {
      return {
        minD: "",
        maxD: "",
        isUpdated: false,
      };
    }

    const minD = formatDate(dates.min_date);
    const maxD = formatDate(dates.max_date);

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    let maxDateParts = dates.max_date.split("-");
    let maxYear = parseInt(maxDateParts[0]);
    let maxMonth = parseInt(maxDateParts[1]);

    let isUpdated = maxYear >= currentYear && maxMonth >= currentMonth;

    return {
      minD,
      maxD,
      isUpdated,
    };
  };
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

      {/* Dates row */}
      <div className="flex justify-between items-start mt-4 mr-4">
        {/* <div className="text-[10px]">
          {cargoDateRange && (
          <><span className="underline">Cargo</span><span className="font-bold"> {cargoDateRange?.minD} - {cargoDateRange?.maxD}</span><span
              className={`${cargoDateRange?.isUpdated ? "bg-green-700" : "bg-red-700"} ml-2 px-2 py-0 inline-flex text-[10px] text-white font-bold`}
            >
              {cargoDateRange?.isUpdated ? "Updated" : "Not updated"}
            </span></>
         )}
        </div>
        
        <div className="text-[10px]">
          {importDateRange && (
          <><span className="underline">Import</span><span className="font-bold"> {importDateRange?.minD} - {importDateRange?.maxD}</span><span
              className={`${importDateRange?.isUpdated ? "bg-green-700" : "bg-red-700"} ml-2 px-2 py-0 inline-flex text-[10px] text-white font-bold`}
            >
              {importDateRange?.isUpdated ? "Updated" : "Not updated"}
            </span></>
         )}
        </div>

        <div className="text-[10px]">
          {uclDateRange && (
          <><span className="underline">UCL</span><span className="font-bold"> {uclDateRange?.minD} - {uclDateRange?.maxD}</span><span
              className={`${uclDateRange?.isUpdated ? "bg-green-700" : "bg-red-700"} ml-2 px-2 py-0 inline-flex text-[10px] text-white font-bold`}
            >
              {uclDateRange?.isUpdated ? "Updated" : "Not updated"}
            </span></>
         )}
        </div> */}
      </div>
      {/* <div className="-mt-2 w-[100px] h-[150px]">
      <Poster />
      </div> */}
      {/*First row */}
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

        <div className="flex flex-col justify-center items-center">
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
        </div>
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
    </>
  );
};

export default Dashboard;
