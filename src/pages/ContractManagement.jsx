import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSort } from "react-icons/bi";
import { FaCheckToSlot } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getContractManagement } from "../redux/features/gifmis";
import { ExptService } from "../services/expt-service";

const ContractManagement = () => {
    const dispatch = useDispatch();
    const contractManagementList = useSelector((state) => state.gifmis.contractManagement);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        const response = dispatch(getContractManagement(page)).unwrap().then((res) => {
            console.log("contractManagement", res.data);
            setTotalPages(res.pages);
        });
    }, [page]);

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handlePageChange = ({ selected }) => {
        (setPage(selected + 1));
    }

    const handleExportClick = async () => {
        console.log("dans export");
        const expt = new ExptService();
        const response = await expt.exportData('contract-management/export');
        window.open(response);
        console.log("res", response);
    }

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

    function formatRightDate(item) {
        let dateToFormat;
        if (item?.gifmisProcesseds[0]?.expendituretype == "Goods") {
            dateToFormat = item?.gifmisProcesseds[0]?.suppliances[0]?.sraDate;
        }
        if (item?.gifmisProcesseds[0]?.expendituretype == "Service") {
            dateToFormat = item?.gifmisProcesseds[0]?.services[0]?.certificationOfCompletionDate;
        }
        if (item?.gifmisProcesseds[0]?.expendituretype == "Works") {
            dateToFormat = item?.gifmisProcesseds[0]?.works[0]?.certificationOfCompletionDate;
        }

        if (dateToFormat) {
            const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
            const formattedDate = new Date(dateToFormat)?.toLocaleDateString(
                "en-US",
                options
            );
            const [month, day, year] = formattedDate?.split("/");
            return `${day}/${month}/${year}`;
        }
        return "";
    }

    return (
        <div className="container h-screen flex justify justify-start flex-col mt-1 mx-auto px-1 overflow-auto ">
            <div className="flex justify justify-between">
                <h1 className="text-[12px] font-bold">Contract Management</h1>
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
                                        CONTRACT DATE{" "}
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
                                        WORK DONE DATE{" "}
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
                            {contractManagementList && contractManagementList.length > 0 ? (
                                contractManagementList?.map((item, itemIndex) => (
                                    <tr key={itemIndex}>
                                        <td className="border-y text-left ">
                                            {item?.id}
                                        </td>
                                        <td className="border-y text-left truncate-25" title={(item?.orgname)}>
                                            {(item?.orgname)}
                                        </td>
                                        <td className="border-y text-left truncate-25" title={(item?.description)}>
                                            {(item?.description)}
                                        </td>
                                        <td className="border-y text-left truncate-25" title={(item?.vendorname)}>
                                            {(item?.vendorname)}
                                        </td>
                                        <td className="border-y text-right ">
                                            {(item?.outstandingclaim)?.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </td>
                                        <td className="border-y text-left ">
                                            {formatDate(item?.gifmisProcesseds[0]?.contracts[0]?.contractDate)}
                                        </td>

                                        <td className="border-y text-left ">
                                            {formatRightDate(item)}
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
            <div className="flex tex-xs justify-end mr-3 mt-1">
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

                {/* <img src="../images/login.jpg" alt="" /> */}
            </div>
        </div>
    );
};

export default ContractManagement;
