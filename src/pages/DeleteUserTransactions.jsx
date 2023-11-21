import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { getAllGifmis, getGifmisUser } from "../redux/features/gifmis";
import { getCurentUser } from "../redux/features/auth";
import { ExptService } from "../services/expt-service";
import { FaTimes } from "react-icons/fa";
import { getUsers } from "../redux/features/users";
import { toast } from 'react-toastify';
import { AssignService } from "../services/assign-service";

function EditTransactionModal({ users, onConfirm, onClose }) {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  let usersToShow = [];

  users.map((user) => {
    if (user.role.roleName != "admin" && user.role.roleName != "supervisor") {
      usersToShow.push(user);
    }
  })

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleConfirm = (id) => {
    onConfirm(id);
  };



  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="text-center">Delete transactions for user:</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>
        <div className="modal-content">
          {/*  <div className="transaction-details">
            <p>ID: {transaction.id}</p>
            <p>Autres détails: {transaction.autresChamps}</p>
          </div> */}
          {/* <h2>Enter the transaction ID:</h2> */}
          <div className="max-h-[80vh] overflow-y-scroll">
            <table className="table-auto w-full bg-white text-[13px]">
              <thead className="sticky -top-1 bg-gray-100">
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 text-left ">LIST</th>
                </tr>
              </thead>
              <tbody>
                {(usersToShow && usersToShow.length > 0) ? (
                  usersToShow?.map((user) => (
                    <tr
                      key={user.id}
                      className="border border-gray-200"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <td
                        className="border border-gray-200 p-2 cursor-pointer"
                        onClick={() => {
                          handleConfirm(user.id);
                        }}
                      >
                        {user.lastname}
                      </td>
                    </tr>
                  ))) : (
                  <tr>
                    <td className="border-y text-center py-2" colSpan="12">
                      <span className="text-red-500 font-extrabold text-[12px]">
                        No users found
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ onConfirm, onClose }) {

  const handleConfirm = () => {
    onConfirm();
  };



  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
        </div>
        <div className="modal-content">
          <h2 className="text-center">Delete the selected transactions ?</h2>
          <h6 className="text-red-500 text-xs text-center mb-2">This action is irreversible</h6>
          <div className="flex gap-2 justify-between">
            <div className="w-[50%]">
              <button
                className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={onClose}
              >
                No
              </button>

            </div>
            <div className="w-[50%]">

              <button
                className="bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={handleConfirm}
              >
                Yes
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DeleteUserTransactions = () => {
  const [currentUser, setCurrentUser] = useState({});
  const users = useSelector((state) => state.users.users);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const assignService = AssignService.getInstance();
  const [checkedTransactions, setCheckedTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const listToShow = useSelector((state) => state.gifmis.gifmisUser);
  const [isHovered, setIsHovered] = useState(false);


  const handleConfirm = async (id) => {
    setModalOpen(false);
    setIdToDelete(id);
    dispatch(getGifmisUser({ page, id })).unwrap().then((res) => {
      console.log("gifmisUser", res);
      setTotalPages(res.pages);
    });
  };

  const handleDeleteConfirm = async () => {
    setDeleteConfirm(false);
    console.log("ids", checkedTransactions);
    let data = {
      ids: checkedTransactions,
    }
    await assignService.deleteSomeGifmisUser(data).then((res) => {
      console.log("resDelete", res);
      if (res.status === 200) {
        setModalOpen(false);
        setDeleteConfirm(false);
        setIdToDelete("");
        setCheckedTransactions([]);
        toast.success("Transactions deleted successfully");
        navigate("/dashboard");
      } else {
        setModalOpen(false);
        setDeleteConfirm(false);
        setIdToDelete("");
        setCheckedTransactions([]);
        toast.error("Error deleting transactions");
        navigate("/dashboard");
      }
    }) 
    /* await assignService.deleteGifmisUser(data).then((res) => {
      console.log("resDelete", res);
      if (res.status === 200) {
        setModalOpen(false);
        setDeleteConfirm(false);
        setIdToDelete("");
        toast.success("Transactions deleted successfully");
        navigate("/dashboard");
      } else {
        setModalOpen(false);
        setDeleteConfirm(false);
        setIdToDelete("");
        toast.error("Error deleting transactions");
        navigate("/dashboard");
      }
    }) */
  }
  const closeModal = () => {
    setModalOpen(false);
    setDeleteConfirm(false);
    setIdToDelete("");
    navigate("/dashboard");
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirm(false);
    setModalOpen(true);
  }


  const isAdmin = currentUser.role?.roleName == "admin";
  console.log('isAdmin', isAdmin);
  useEffect(() => {
    const response0 = dispatch(getUsers()).unwrap().then((res) => {
      console.log("users", res.data);
    });

    dispatch(getCurentUser()).unwrap().then(res => {
      console.log("res", res.user.id);
      setCurrentUser(res.user);
    }).catch(error => {
      console.log(error);
    });


  }, [page]);

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

  const handlePageChange = ({ selected }) => {
    (setPage(selected + 1));
  };


  const handleTransactionDetail = (id) => {
    navigate(`/dashboard/transactiondetails/${id}`);
  };

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

  const handleCheckboxChange = (e, item) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedTransactions((prevChecked) => [...prevChecked, item.id]);
    } else {
      setCheckedTransactions((prevChecked) =>
        prevChecked.filter((idTransac) => idTransac !== item.id)
      );
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDDeleteGo = async () => {
    setDeleteConfirm(true);
  }

  console.log("checked", checkedTransactions);
  return (
    <div className="container h-screen flex justify justify-start flex-col mt-1 mx-auto px-1 overflow-auto ">
      <div className="flex justify justify-between">
        <h1 className="text-[12px] font-bold">User Transactions</h1>
        <div className="flex w-[18%] justify-end">
        <button
            className={`text-[12px] font-bold border border-green-400 bg-red-200 p-1 rounded mb-2 shadow-lg ${isHovered ? 'hovered' : ''
              }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => { setDeleteConfirm(true) }}
            disabled={checkedTransactions.length === 0}
          >
            DELETE
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
            {/* <input
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
            /> */}
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
                    ACTION{" "}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {listToShow && listToShow.length > 0 ? (
                listToShow?.map((item, itemIndex) => (

                  <tr key={itemIndex} onClick={() => {
                    if ((!isAdmin) && (item?.status !== 'COMPLETED') && (item?.gifmisUser[0]?.user?.id == currentUser?.id)) {
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
                    <td>
                      <input
                        type="checkbox"
                        checked={checkedTransactions.some((id) => id === item.id)}
                        onChange={(e) => handleCheckboxChange(e, item)}
                        className="w-6 h-6"
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
      {isModalOpen && (
        (<EditTransactionModal
          users={users}
          onConfirm={handleConfirm}
          onClose={closeModal}
        />
        ))}

      {deleteConfirm && (
        (<DeleteConfirmModal
          onConfirm={handleDeleteConfirm}
          onClose={closeDeleteConfirm}
        />
        ))}


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

export default DeleteUserTransactions;
