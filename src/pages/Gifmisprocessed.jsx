import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSort } from "react-icons/bi";
import { FaAccessibleIcon, FaArrowUpFromGroundWater, FaBellSlash, FaCheckToSlot, FaEye } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getAllGifmisProcessed } from "../redux/features/gifmis-processed";
import { FaEdit, FaTimes } from "react-icons/fa";
import { getCurentUser } from "../redux/features/auth";
import { ExptService } from "../services/expt-service";
import ViewDetails from "./ViewDetails";

function EditTransactionModal({ transaction, onConfirm, onClose }) {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
      setIsHovered(true);
  };

  const handleMouseLeave = () => {
      setIsHovered(false);
  };
  const handleConfirm = () => {
    console.log("la transac", transaction);
    if (id == transaction.idgifmis) {

      onConfirm();
    } else {
      setError("Incorrect ID. Try again.");
    }
  };



  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Transaction</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>
        <div className="modal-content">
          {/*  <div className="transaction-details">
            <p>ID: {transaction.id}</p>
            <p>Autres détails: {transaction.autresChamps}</p>
          </div> */}
          {/* <h2>Enter the transaction ID:</h2> */}
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border inputModal"
            placeholder="Enter the transaction ID"
          />
          {error && <div className="error">{error}</div>}
          <button className="confirm-button " onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// const limit = 25;

const GifmisprocessedPage = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.gifmisProcessed.gifmisProcessed);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const response = dispatch(getAllGifmisProcessed()).unwrap().then((res) => {
      console.log("gifprocessed", res);
    });

    dispatch(getCurentUser()).unwrap().then(res => {
      console.log("res", res.user);
      setCurrentUser(res.user);
    }).catch(error => {
      console.log(error);
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
    const response = await expt.exportData('gifmis-processed/export');
    window.open(response);
    console.log("res", response);
}

  

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
  const handleTransactionEdit = (transaction) => {
    // Lorsque l'utilisateur clique sur l'icône "FaEdit", stockez les détails de la transaction
    setCurrentTransaction(transaction);
    // Affichez la fenêtre modale pour la saisie de l'ID
    setModalOpen(true);
  };

  const handleTransactionShow = (transaction) => {
    navigate(`/dashboard/view/${transaction.id}`);
  }
  const handleConfirm = () => {
    // Cette fonction sera appelée lorsque l'ID est confirmé dans la fenêtre modale
    // Naviguez vers la page de "edittransaction" avec l'ID de la transaction actuelle
    navigate(`/dashboard/edittransaction/${currentTransaction.id}`);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentTransaction(null);
  };
  /*   const startIndex = (page - 1) * limit; */

  return (
    <div className="container h-screen flex justify justify-start flex-col mt-1 mx-auto px-1 overflow-auto ">
      <div className="flex justify justify-between">
                <h1 className="text-[12px] font-bold">Payable Processed</h1>
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
                <th className="border border-gray-200 text-left ">PAYMENT STATUS</th>
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
                <th className="border border-gray-200  ">
                  <span className="inline-flex items-center">
                    ACTION{" "}
                    {/* <BiSort
                      size={15}
                      className={`ml-2 cursor-pointer ${sortField === "balancetobepaid"
                          ? "text-blue-500"
                          : "text-gray-500"
                        }`}
                      onClick={() => handleSort("balancetobepaid", "desc")}
                    /> */}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions && transactions.length > 0 ? (
                transactions?.map((item, itemIndex) =>
                (

                  <tr key={itemIndex} onClick={() => {
                    if (item?.userId == currentUser?.id) {
                      // Exécutez l'action souhaitée lorsque la ligne est cliquée
                      handleTransactionEdit(item);
                    }
                  }}
                  >
                    {/*  <td className="border-y text-left ">
                      {item.id}
                    </td> */}
                    <td className="border-y text-left ">
                      {(item.payment)}
                    </td>
                    <td
                      className="border-y text-left truncate-25 "
                      title={item.gifmis.orgname}
                    >
                      {(item.gifmis.orgname)}
                    </td>
                    <td
                      className="border-y text-left truncate-25"
                      title={item.gifmis.description}
                    >
                      {(item.gifmis.description)}
                    </td>
                    <td className="border-y text-left truncate-25" title={item.gifmis.vendorname}>
                      {(item.gifmis.vendorname)}
                    </td>
                    <td className="border-y text-right truncate-25">
                      {(item.gifmis.revisedcontractamount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border-y text-right truncate-25">
                      {(item.gifmis.amountpaid).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border-y text-right truncate-25">
                      {(item.gifmis.outstandingclaim).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border-y text-left truncate-25" title={item.user.lastname}>
                      {`${item.user?.lastname || ''} - ${item.user?.staffid || ''}`}
                    </td>
                    
                    <td className={`border-y text-center text-yellow-500 inline-flex gap-2`} style={{ placeItems: 'center' }}>
                     {/*  {item.userId == currentUser.id ? (
                        <FaEdit
                          onClick={() => handleTransactionEdit(item)}
                          size={20}
                          className="cursor-pointer"
                        />
                      ) : (
                        <FaEdit
                        style={{
                          cursor: 'not-allowed',
                          pointerEvents: 'none',
                          color: 'gray',
                        }}
                          size={20}
                          className="cursor-pointer"
                        />
                      )} */}
                      <FaEye
                      size={18} 
                      className="text-blue-500 cursor-pointer text-center"
                      onClick={() => handleTransactionShow(item)}
                      />

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
      {isModalOpen && currentTransaction && (
        <EditTransactionModal
          transaction={currentTransaction}
          onConfirm={handleConfirm}
          onClose={closeModal}
        />
      )}
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

export default GifmisprocessedPage;
