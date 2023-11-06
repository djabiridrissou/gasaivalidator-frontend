import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


import ReactPaginate from "react-paginate";
import { AiOutlineSearch } from "react-icons/ai";
import { BiListMinus, BiSort } from "react-icons/bi";
import { FaCheckToSlot } from "react-icons/fa6";
import TransactionDetails from "../components/TransacAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getAllGifmis } from "../redux/features/gifmis";
import { getCurentUser } from "../redux/features/auth";
import { ExptService } from "../services/expt-service";

// const limit = 25;

const Goods = () => {

  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.gifmis.transactions);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limitR, setLimit] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isAdmin = currentUser.role?.roleName == "admin";
  console.log('isAdmin', isAdmin);
  useEffect(() => {
    console.log("page dans jsx", page, "search", searchTerm);
    //setLimit(limit);
    const response = dispatch(getAllGifmis({page, searchTerm})).unwrap().then((res) => {
      console.log("transac", res.pages);
      setTotalPages(res.pages);
    });
    dispatch(getCurentUser()).unwrap().then(res => {
      console.log("res", res.user.id);
      setCurrentUser(res.user);
    }).catch(error => {
      console.log(error);
    });
  }, [page, searchTerm]);

  const handleExportClick = async () => {
    console.log("dans export");
    const expt = new ExptService();
    const response = await expt.exportData('gifmis/export');
    window.open(response);
    console.log("res", response);
  }

  const handleLimitChange = (limitToSet) => {
    console.log("dans setLimit", limitToSet);
    if (limitToSet > 0) {
      setLimit(limitToSet);
    }

  };

  /*   const handleSort = (field) => {
      if (field === sortField) {
        dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"));
      } else {
        dispatch(setSortField(field));
        dispatch(setSortOrder("asc"));
      }
    }; */

  const handlePageChange = ({ selected }) => {
    (setPage(selected + 1));
  };



  const handleSearchInputChange = (e) => {
      const newSearchTerm = e.target.value;
      setSearchTerm(e.target.value);
      console.log("newSearchTerm", newSearchTerm);
      setPage(1); // Réinitialise la page à 1 lorsque la recherche est modifiée
      //console.log('dans search');
    };

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
  const handleTransactionDetail = (id) => {
    navigate(`/dashboard/transactiondetails/${id}`);
  };

  /*   const startIndex = (page - 1) * limit; */
console.log('currentUser', currentUser);
console.log(transactions)
  return (
    <div className="container h-screen flex justify justify-start flex-col mt-1 mx-auto px-1 overflow-auto ">
      <div className="flex justify justify-between">
        <h1 className="text-[12px] font-bold">PAYABLE</h1>
        <div className="flex w-[18%] justify-end">
          <button
            className={`text-[12px] font-bold border border-green-400 bg-green-200 p-1 rounded mb-2 shadow-lg ${isHovered ? 'hovered' : ''
              }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => { handleExportClick() }}
          >
            Export in excel File
          </button>
        </div>
      </div>


      {/* Tableau */}
      <div className="bg-white rounded-lg p-2 border shadow-md">
        <div className="flex justify-between mb-2">
          {/* <div className="flex gap-1 items-center">
            <span>Show</span>
            <select
              name="limit"
              id="limit"
              onChange={(e) => handleLimitChange(parseInt(e.target.value))}
              className={`text-[0.8rem] px-[1rem] py-[0.22rem] border border-gray-400 rounded-[0.25rem] shadow-lg placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-gray-300 focus:border-gray-500`}
            >
              <option value={25}  >25</option>
              <option value={50} >50</option>
              <option value={100} >100</option>
            </select>
            <span>entries</span>
          </div> */}

          <div className="flex relative w-[30%]">
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={handleSearchInputChange}
              autoFocus
              placeholder="Search ORGANISATION, VENDOR OR DESCRIPTION...."
              className={`w-full text-[0.8rem] px-[0.75rem] py-[0.22rem] border border-gray-400 rounded-[0.25rem] shadow-lg placeholder-[#8391a2] placeholder-shown:sm focus:ring-[0.2px] focus:ring-gray-300 focus:border-gray-400`}
            />
            <AiOutlineSearch
              size={18}
              className="absolute right-2 top-[7px]  text-gray-400"
            />
          </div>


        </div>
        <div className="max-h-[80vh] overflow-y-scroll">
          <table className="table-auto w-full bg-white text-[13px]">
            <thead className="sticky -top-1 bg-gray-100">
              <tr className="bg-gray-100">
                <th className="border border-gray-200 text-left ">ID</th>
                {/* <th className="border border-gray-200  ">
                  <span className="inline-flex items-center">
                    SN{" "}
                    <BiSort
                      size={15}
                      className={`ml-2 cursor-pointer ${sortField === "sn"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => handleSort("sn", "desc")}
                    /> 
                  </span>
                </th> */}
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
                      className={`ml-2 cursor-pointer ${sortField === "vendorname"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => handleSort("vendorname", "desc")}
                    /> */}
                  </span>
                </th>
                <th className="border border-gray-200  ">
                  <span className="inline-flex items-center">
                    REVISED CONTRACT AMOUNT{" "}
                    {/* <BiSort
                      size={15}
                      className={`ml-2 cursor-pointer ${sortField === "revisedcontractamount"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => handleSort("revisedcontractamount", "desc")}
                    /> */}
                  </span>
                </th>
                <th className="border border-gray-200  ">
                  <span className="inline-flex items-center">
                    AMOUNT PAID{" "}
                    {/* <BiSort
                      size={15}
                      className={`ml-2 cursor-pointer ${sortField === "amountpaid"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => handleSort("amountpaid", "desc")}
                    /> */}
                  </span>
                </th>
                <th className="border border-gray-200  ">
                  <span className="inline-flex items-center">
                    OUTSTANDING CLAIM{" "}
                    {/* <BiSort
                      size={15}
                      className={`ml-2 cursor-pointer ${sortField === "outstandingclaim"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => handleSort("outstandingclaim", "desc")}
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
                {/* <th className="border border-gray-200  ">
                  <span className="inline-flex items-center">
                    ACTION{" "}
                    {/* <BiSort
                      size={15}
                      className={`ml-2 cursor-pointer ${sortField === "balancetobepaid"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => handleSort("balancetobepaid", "desc")}
                    /> 
                  </span>
                </th> */}
                <th className="border border-gray-200  ">
                  <span className="inline-flex items-center">
                    STATUS{" "}
                    {/* <BiSort
                      size={15}
                      className={`ml-2 cursor-pointer ${sortField === "status"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => handleSort("status", "desc")}
                    /> */}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions && transactions.length > 0 ? (
                transactions?.map((item, itemIndex) => (

                  <tr key={itemIndex} onClick={() => {
                    if ((!isAdmin) && (item?.status !== 'COMPLETED') && (item?.gifmisUser[0]?.user?.id == currentUser?.id)) {
                      // Exécutez l'action souhaitée lorsque la ligne est cliquée
                      handleTransactionDetail(item?.id);
                    }
                  }}
                    style={{
                      cursor: item?.status !== 'COMPLETED' && !isAdmin ? 'pointer' : 'not-allowed',
                    }}>
                    <td className="border-y text-left ">
                      {(item?.id)}
                    </td>
                    {/*  <td className="border-y text-left ">
                      {(item.sn)}
                    </td> */}
                    <td
                      className="border-y text-left truncate-25 "
                      title={item?.orgname}
                    >
                      {renderHighlightedTableCell(item?.orgname)}
                    </td>
                    <td
                      className="border-y text-left truncate-25"
                      title={item?.description}
                    >
                      {renderHighlightedTableCell(item?.description)}
                    </td>
                    <td className="border-y text-left truncate-25" title={item?.vendorname}>
                      {renderHighlightedTableCell(item?.vendorname)}
                    </td>
                    <td
                      className="border-y text-right truncate-25"

                    >
                      {item?.revisedcontractamount?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).replace(/\.?0+$/, "")}
                    </td>
                    <td className="border-y text-right ">
                      {item?.amountpaid
                        ?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                        .replace(/\.?0+$/, "")}
                    </td>
                    <td className="border-y text-right ">
                      {item?.outstandingclaim
                        ?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                        .replace(/\.?0+$/, "")}
                    </td>
                    <td className="border-y text-left truncate-25">
                      {`${item?.gifmisUser[0]?.user?.staffid || ''} - ${item?.gifmisUser[0]?.user?.lastname || ''}`}
                    </td>
                    {/* <td className={`border-y text-center ${item.status === 'COMPLETED' ? 'text-green-600' : 'text-red-600'}`} style={{ placeItems: 'center' }}>
                      <FaCheckToSlot
                        style={{
                          cursor: item.status !== 'COMPLETED' ? 'pointer' : 'not-allowed',
                          pointerEvents: isAdmin ? 'none' : item.status !== 'COMPLETED' ? 'auto' : 'none',
                        }}
                        onClick={() => handleTransactionDetail(item?.id)}
                        size={20}
                      />
                    </td> */}
                    <td
                      className={`border-y text-left truncate-25 ${item?.status === 'COMPLETED' ? 'text-green-600' : 'text-red-600'
                        }`}
                      title=""
                    >
                      {item?.status === 'COMPLETED' ? 'COMPLETED' : 'INCOMPLETE'}
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

export default Goods;
