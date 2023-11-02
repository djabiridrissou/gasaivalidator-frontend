import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSort } from "react-icons/bi";
import { FaCheckToSlot } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getAllNotInGifmis } from "../redux/features/gifmis";
import { ExptService } from "../services/expt-service";

const NoWarrant = () => {
    const dispatch = useDispatch();
    const nowarrantList = useSelector((state) => state.gifmis.notInGifmis);
    const navigate = useNavigate();
    useEffect(() => {
        const response = dispatch(getAllNotInGifmis()).unwrap().then((res) => {
            console.log("notingifmis", res.data);
        });
    }, []);
    useEffect(() => {
        const response = dispatch(getAllNotInGifmis()).unwrap().then((res) => {
            console.log("notInGifmis", res.data);
        });
    }, []);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const handleExportClick = async () => {
        console.log("dans export");
        const expt = new ExptService();
        const response = await expt.exportData('notingifmis/export');
        window.open(response);
        console.log("res", response);
    }
    return (
        <div className="container h-screen flex justify justify-start flex-col mt-1 mx-auto px-1 overflow-auto ">
            <div className="flex justify justify-between">
                <h1 className="text-[12px] font-bold">Not IN GIFMIS</h1>
                <div className="flex w-[18%] justify-end">
                    {/* <button
                        className={`text-[12px] font-bold border border-green-400 bg-green-200 p-1 rounded mb-2 shadow-lg ${isHovered ? 'hovered' : ''
                            }`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => { handleExportClick() }}
                    >
                        Export in excel File
                    </button> */}
                </div>
            </div>
            <div className="bg-white rounded-lg p-2 border shadow-md">
                <div className="flex justify-between mb-2">
                </div>
                <div className="max-h-[80vh] overflow-y-scroll">
                    <table className="table-auto w-full bg-white text-[13px]">
                        <thead className="sticky -top-1 bg-gray-100">
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200  ">
                                    <span className="inline-flex items-start">
                                        ID TRANSACTION{" "}
                                        {/* <BiSort
                      size={15}
                      className={`ml-2 cursor-pointer ${sortField === "orgname"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => handleSort("orgname", "desc")}
                    /> */}
                                    </span>
                                </th>
                                <th className="border border-gray-200  ">
                                    <span className="inline-flex items-start">
                                        ORGANISATION NAME{" "}
                                        {/* <BiSort
                      size={15}
                      className={`ml-2 cursor-pointer ${sortField === "description"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => handleSort("description", "desc")}
                    /> */}
                                    </span>
                                </th>
                                <th className="border border-gray-200  ">
                                    <span className="inline-flex items-start">
                                        DESCRIPTION{" "}
                                        {/* <BiSort
                      size={15}
                      className={`ml-2 cursor-pointer ${sortField === "description"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => handleSort("description", "desc")}
                    /> */}
                                    </span>
                                </th>
                                <th className="border border-gray-200  ">
                                    <span className="inline-flex items-center">
                                        VENDOR NAME{" "}
                                        {/* <BiSort
                      size={15}
                      className={`ml-2 cursor-pointer ${sortField === "description"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => handleSort("description", "desc")}
                    /> */}
                                    </span>
                                </th>
                                <th className="border border-gray-200  ">
                                    <span className="inline-flex items-center">
                                        OUTSTANDING CLAIM{" "}
                                        {/* <BiSort
                      size={15}
                      className={`ml-2 cursor-pointer ${sortField === "description"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => handleSort("description", "desc")}
                    /> */}
                                    </span>
                                </th>
                                <th className="border border-gray-200  ">
                                    <span className="inline-flex items-center">
                                        REMARKS{" "}
                                        {/* <BiSort
                      size={15}
                      className={`ml-2 cursor-pointer ${sortField === "description"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => handleSort("description", "desc")}
                    /> */}
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {nowarrantList && nowarrantList.length > 0 ? (
                                nowarrantList?.map((item, itemIndex) => (
                                    <tr key={itemIndex}>
                                        <td className="border-y text-left ">
                                            {item?.id}
                                        </td>
                                        <td className="border-y text-left ">
                                            {(item?.orgname)}
                                        </td>
                                        <td className="border-y text-left truncate-25" title={(item?.description)}>
                                            {(item?.description)}
                                        </td>
                                        <td className="border-y text-left ">
                                            {(item?.vendorname)}
                                        </td>
                                        <td className="border-y text-left ">
                                            {(item?.outstandingclaim).toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </td>
                                        <td className="border-y text-left ">
                                           Not In Gifmis
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border-y text-center py-2" colSpan="12">
                                        <span className="text-red-500 font-extrabold text-[12px]">
                                            No data found
                                        </span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Pagination */}
            {/* <div className="flex tex-xs justify-end mr-3 mt-1">
        <ReactPaginate
          previousLabel="Prev"
          nextLabel="Next"
          breakLabel="..."
          breakClassName=""
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination flex items-center gap-[4px]"
          subContainerClassName="pages pagination"
          activeClassName="active" // Ajoutez vos styles personnalisés ici
          pageClassName="pagination-item"
          style={{ overflowX: "hidden" }} // Ajoutez la classe CSS personnalisée ici
          forcePage={page - 1}
        />

        {/* <img src="../images/login.jpg" alt="" /> 
      </div> */}
        </div>
    );
};

export default NoWarrant;
