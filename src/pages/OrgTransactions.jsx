import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


import ReactPaginate from "react-paginate";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSort } from "react-icons/bi";
import { FaCheckToSlot } from "react-icons/fa6";
import TransactionDetails from "../components/TransacAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { countPerOrganisation } from "../redux/features/gifmis";

// const limit = 25;

const OrgTransactions = () => {


  const dispatch = useDispatch();
  const organisations = useSelector((state) => state.gifmis.transactionsPerOrg);
  const navigate = useNavigate();


  useEffect(() => {
    const response = dispatch(countPerOrganisation()).unwrap().then((res) => {
      console.log("organisations", res.data);
    });
  }, []);


  /* 
    const handleLimitChange = (e) => {
      dispatch(setLimit(parseInt(e.target.value)));
    }; */

  /*   const handleSort = (field) => {
      if (field === sortField) {
        dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"));
      } else {
        dispatch(setSortField(field));
        dispatch(setSortOrder("asc"));
      }
    }; */

  /*   const handlePageChange = ({ selected }) => {
      dispatch(setPage(selected + 1));
    };
  
    */

  /*   const handleSearchInputChange = (e) => {
      const newSearchTerm = e.target.value;
      dispatch(setSearchTerm(e.target.value));
      dispatch(setPage(1)); // Réinitialise la page à 1 lorsque la recherche est modifiée
      //console.log('dans search');
    }; */

  /*   if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="animate-spin text-gray-500 text-4xl"
          />
        </div>
      );
    } */



  // function formatDate(dateString) {
  //   if (dateString) {
  //     const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
  //     const formattedDate = new Date(dateString).toLocaleDateString(
  //       "en-US",
  //       options
  //     );
  //     const [month, day, year] = formattedDate.split("/");
  //     return `${day}/${month}/${year}`;
  //   }
  //   return "";
  // }

  function renderHighlightedTableCell(value) {
    if (value) {
      return (
        <span
        /* dangerouslySetInnerHTML={{
          __html: value.replace(
            /* new RegExp(searchTerm, "gi"),
            (match) => `<span class="highlight">${match}</span>` 
          ),
        }} */
        />
      );
    }
  }
  const handleTransactionDetail = (id) => {
    navigate(`/dashboard/transactiondetails/${id}`);
  };

  /*   const startIndex = (page - 1) * limit; */

  return (
    <div className="container h-screen flex justify justify-start flex-col mt-1 mx-auto px-1 overflow-auto ">
      <h1 className="text-[16px] font-bold"></h1>
      {/* Tableau */}
      <div className="bg-white rounded-lg p-2 border shadow-md">
        <div className="flex justify-between mb-2">
          {/*     <div className="flex gap-1 items-center">
            <span>Show</span>
            <select
              name="limit"
              id="limit"
              value={limit}
              onChange={handleLimitChange}
              className={`text-[0.8rem] px-[1rem] py-[0.22rem] border border-gray-400 rounded-[0.25rem] shadow-lg placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-gray-300 focus:border-gray-500`}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>entries</span>
          </div> */}

          {/* <div className="flex relative w-[30%]">
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={handleSearchInputChange}
              autoFocus
              placeholder="Any field except ID....."
              className={`w-full text-[0.8rem] px-[0.75rem] py-[0.22rem] border border-gray-400 rounded-[0.25rem] shadow-lg placeholder-[#8391a2] focus:ring-[0.2px] focus:ring-gray-300 focus:border-gray-400`}
            />
            <AiOutlineSearch
              size={18}
              className="absolute right-2 top-[7px]  text-gray-400"
            />
          </div> */}
        </div>
        <div className="max-h-[80vh] overflow-y-scroll">
          <table className="table-auto w-full bg-white text-[13px]">
            <thead className="sticky -top-1 bg-gray-100">
              <tr className="bg-gray-100">
                <th className="border border-gray-200  ">
                  <span className="inline-flex items-center">
                    ORGANISATION NAME{" "}
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
                    TOTAL TRANSACTIONS{" "}
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
                    TOTAL OUTSTANDING{" "}
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
              {organisations && organisations.length > 0 ? (
                organisations?.map((item, itemIndex) => (

                  <tr key={itemIndex}>
                    <td className="border-y text-left ">
                      {item.orgname}
                    </td>
                    <td className="border-y text-left ">
                      {(item.transactions)}
                    </td>
                    <td className="border-y text-left ">
                      {(item.total_outstanding).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
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

export default OrgTransactions;
