import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSort } from "react-icons/bi";
import { FaCheckToSlot } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getOverpayment } from "../redux/features/gifmis";
import { ExptService } from "../services/expt-service";

const Overpayment = () => {
    const dispatch = useDispatch();
    const overpaymentList = useSelector((state) => state.gifmis.overpayment);
    const listToShow = [];
    

    const navigate = useNavigate();
    useEffect(() => {
        const response = dispatch(getOverpayment())
            .unwrap()
            .then((res) => {
                console.log("overpayment", res.data);
            });
    }, []);
    function customParse(str) {
        // Supprimer les virgules pour les milliers
        str = str.replace(/,/g, "");
      
        // Remplacer le point par la virgule pour le séparateur décimal
        str = str.replace(".", ",");
      
        return parseFloat(str);
      }

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
        const response = await expt.exportData("overpayment/export");
        window.open(response);
        console.log("res", response);
    };

    const calculateTransactionAmount = (transactions) => {
        let total = 0;
        const totalTransactions = transactions.map((item) => {
            const amount = customParse(item.amountPaid);
            console.log("dans calc", item, amount);
            if (!isNaN(amount)) {
                total += amount;
            } else {
                total += 0;
            }
        });
        console.log("total", total);
        return total;
    };

    const calculateContractAmount = (contracts) => {
        let total = 0;
        const totalContracts = contracts.map((item) => {
            const amount = customParse(item.unitPrice);
            console.log("dans contrat", item, amount);
            if (!isNaN(amount)) {
                total += amount;
            } else {
                total += 0;
            }
        });
        console.log("totalcontracts", total);
        return total;
    };

    const formatRemarks = (item) => {
        let remarksString = "";
        if (item) {
            if (item?.gifmisProcesseds[0]?.fundingtype == "Central government") {
                if (!(item?.gifmisProcesseds[0]?.warrantsupported)) {
                    remarksString += " No-Warrant";
                }

                if (!(item?.gifmisProcesseds[0]?.availablebta)) {
                    remarksString += " No-BTA";
                }
                if (!(item?.gifmisProcesseds[0]?.transactioningifmis)) {
                    remarksString += " Not-In-GIFMIS";
                }
                if (!(item?.gifmisProcesseds[0]?.auditorsatisfy)) {
                    remarksString += " Auditor-not-satisfied";
                }
                if (item?.gifmisProcesseds[0]?.expendituretype == "Goods") {
                    if (!(item?.gifmisProcesseds[0]?.isitemsupplied)) {
                        remarksString += " Not-Supplyed";
                    }
                    if (!(item?.gifmisProcesseds[0]?.isitemdistributed)) {
                        remarksString += " Not-distributed";
                    }
                    if (!(item?.gifmisProcesseds[0]?.anyavailableinstore)) {
                        remarksString += " Not-In-Store";
                    }
                    if (!(item?.gifmisProcesseds[0]?.availablecontracts)) {
                        remarksString += " No-Contracts";
                    }
                }
                if (item?.gifmisProcesseds[0]?.expendituretype == "Service") {
                    if (!(item?.gifmisProcesseds[0]?.isservicecompleted)) {
                        remarksString += " Service-not-completed";
                    }
                    if (!(item?.gifmisProcesseds[0]?.availablecontracts)) {
                        remarksString += " No-Contracts";
                    }
                }
                if (item?.gifmisProcesseds[0]?.expendituretype == "Works") {
                    if (item?.gifmisProcesseds[0]?.worktype == "Roads" || item?.gifmisProcesseds[0]?.worktype == "Bridge") {
                        if (!(item?.gifmisProcesseds[0]?.ipcsupported)) {
                            remarksString += " No-IPC";
                        }
                    }
                    if (item?.gifmisProcesseds[0]?.worktype != "Roads" && item?.gifmisProcesseds[0]?.worktype == "Bridge") {
                        if (!(item?.gifmisProcesseds[0]?.availablecontracts)) {
                            remarksString += " No-Contracts";
                        }
                    }
                    if (!(item?.gifmisProcesseds[0]?.isworkcompleted)) {
                        remarksString += " Work-not-completed";
                    }
                }

            }
        }
        return remarksString;
    }

    overpaymentList?.map((item) => {
        let totalPayment = calculateTransactionAmount(item?.gifmisProcesseds[0]?.transactions);
        let contractPayment = calculateContractAmount(item?.gifmisProcesseds[0]?.contracts);
        
        if (totalPayment > contractPayment) {
            let data = {
                totalPayment: totalPayment,
                contractPayment: contractPayment,
                item: item,
            }
            listToShow.push(data);
        }
    });
    console.log("listToShow", listToShow);

    return (
        <div className="container h-screen flex justify justify-start flex-col mt-1 mx-auto px-1 overflow-auto ">
            <div className="flex justify justify-between">
                <h1 className="text-[12px] font-bold">OVERPAYMENT</h1>
                <div className="flex w-[18%] justify-end">
                    {/* <button
            className={`text-[12px] font-bold border border-green-400 bg-green-200 p-1 rounded mb-2 shadow-lg ${
              isHovered ? "hovered" : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              handleExportClick();
            }}
          >
            Export in excel File
          </button> */}
                </div>
            </div>
            <div className="bg-white rounded-lg p-2 border shadow-md">
                <div className="flex justify-between mb-2"></div>
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
                                        CONTRACT AMOUNT{" "}
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
                                        TOTAL PAYMENT{" "}
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
                            {listToShow && listToShow.length > 0 ? (
                                listToShow?.map((item, itemIndex) => (
                                    <tr key={itemIndex}>
                                        <td className="border-y text-left ">{item?.item?.id}</td>
                                        <td className="border-y text-left ">{item?.item?.orgname}</td>
                                        <td
                                            className="border-y text-left truncate-25"
                                            title={item?.item?.description}
                                        >
                                            {item?.item?.description}
                                        </td>
                                        <td className="border-y text-left ">{item?.item?.vendorname}</td>
                                        <td className="border-y text-right ">
                                            {item?.item?.outstandingclaim?.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </td>
                                        <td className="border-y text-right ">
                                            {(item?.contractPayment)?.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </td>
                                        <td className="border-y text-right ">
                                        {(item?.totalPayment)?.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </td>
                                        <td className="border-y text-left truncate-25">
                                            OVER-PAYMENT
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

export default Overpayment;
