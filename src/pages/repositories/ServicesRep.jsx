import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSort } from "react-icons/bi";
import { FaCheckToSlot } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getAllServicesRepo } from "../../redux/features/repositories/services-repSlice";

const ServicesRepo = () => {
    const dispatch = useDispatch();
    const servicesRepository = useSelector((state) => state.servicesRepo.servicesRepository);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        const response = dispatch(getAllServicesRepo({page, searchTerm})).unwrap().then((res) => {
            //console.log("ipcrepo", res);
            setTotalPages(res.pages);
        });
    }, [page, searchTerm]);


    const handlePageChange = ({ selected }) => {
        (setPage(selected + 1));
    }

    const handleSearchInputChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        setPage(1);
    };

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

    function renderHighlightedTableCell(value) {
        if (value) {
            value = value.toString();
            return (
                <span
                    dangerouslySetInnerHTML={{
                        __html: value.replace(
                            new RegExp(searchTerm, "gi"),
                            (match) => `<span class="highlight">${match}</span>`
                        ),
                    }}
                />
            );
        }
    }
console.log("services", servicesRepository);
    return (
        <div className="container h-screen flex justify justify-start flex-col mt-1 mx-auto px-1 overflow-auto ">
            <h1 className="text-[12px] font-bold">SERVICES REPOSITORY</h1>
            <div className="flex justify justify-between">
                <div className="flex relative w-[30%]">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        autoFocus
                        placeholder="Search...."
                        className={`w-full text-[0.8rem] px-[0.75rem] py-[0.22rem] border border-gray-400 rounded-[0.25rem] shadow-lg placeholder-[#8391a2] placeholder-shown:sm focus:ring-[0.2px] focus:ring-gray-300 focus:border-gray-400`}
                    />
                    <AiOutlineSearch
                        size={18}
                        className="absolute right-2 top-[7px]  text-gray-400"
                    />
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
                                    <span className="inline-flex items-left">
                                        ID{" "}
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
                                    <span className="inline-flex items-center">
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
                                    <span className="inline-flex items-center truncate-25" title="DESCRIPTION">
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
                                    <span className="inline-flex items-center truncate-25" title="VENDOR NAME">
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
                                    <span className="inline-flex items-center truncate-25" title="OUTSTANDING CLAIM">
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
                                        ASSIGN TO{" "}
                                        {/* <BiSort
                      size={15}
                      className={`ml-2 cursor-pointer ${sortField === ""
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => handleSort("", "desc")}
                    /> */}
                                    </span>
                                </th>
                                <th className="border border-gray-200  ">
                                    <span className="inline-flex items-center truncate-25" title="CERTIFICATION ISSUED BY">
                                        CERTIFICATION ISSUED BY{" "}
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
                                    <span className="inline-flex items-center truncate-25" title="CERTIFICATION OF COMPLETION DATE">
                                        COMPLETION DATE{" "}
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
                                    <span className="inline-flex items-center truncate-25" title="DESIGNATION">
                                        DESIGNATION{" "}
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
                                    <span className="inline-flex items-center truncate-25" title="FILE LABEL NUMBER">
                                        FILE LABEL NUMBER{" "}
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
                                    <span className="inline-flex items-center truncate-25" title="PERCENTAGE OF COMPLETION DATE">
                                        PERCENTAGE OF COMPLETION DATE{" "}
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
                            {servicesRepository && servicesRepository.length > 0 ? (
                                servicesRepository?.map((item, itemIndex) => (
                                    item.gifmisProcesseds[0]?.services?.map((service, i) => (
                                        <tr key={itemIndex + `${i}`}>
                                            <td className="border-y text-left ">
                                                {renderHighlightedTableCell(item?.id)}
                                            </td>
                                            <td className="border-y text-left truncate-25" title={(item?.orgname)}>
                                                {renderHighlightedTableCell(item?.orgname)}
                                            </td>
                                            <td className="border-y text-left truncate-25" title={(item?.description)}>
                                                {renderHighlightedTableCell(item?.description)}
                                            </td>
                                            <td className="border-y text-left truncate-25" title={(item?.vendorname)}>
                                                {renderHighlightedTableCell(item?.vendorname)}
                                            </td>
                                            <td className="border-y text-right ">
                                                {(item?.outstandingclaim)?.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </td>
                                            <td className="border-y text-left truncate-25" title={item?.user?.lastname}>
                                                {`${item?.gifmisProcesseds[0]?.user?.lastname || ''} - ${item?.gifmisProcesseds[0]?.user?.staffid || ''}`}
                                            </td>
                                            <td className="border-y text-left ">
                                                {(service?.certificationIssuedBy)}
                                            </td>
                                            <td className="border-y text-left ">
                                                {formatDate(service?.certificationOfCompletionDate)}
                                            </td>
                                            <td className="border-y text-left ">
                                                {(service?.designation)}
                                            </td>
                                            <td className="border-y text-left ">
                                                {(service?.fileLabelNumber)}
                                            </td>
                                            <td className="border-y text-left ">
                                                {(service?.percentageOfCompletion)}
                                            </td>
                                        </tr>
                                    ))
                                )
                                ))
                                : (
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

export default ServicesRepo;
