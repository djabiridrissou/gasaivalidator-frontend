import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { getAllGifmis } from "../redux/features/gifmis";
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
                    <h2 className="text-center">Delete all the transactions ?</h2>
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [idToDelete, setIdToDelete] = useState("");
    const assignService = AssignService.getInstance();


    const handleConfirm = async (id) => {
        setModalOpen(false);
        setDeleteConfirm(true);
        setIdToDelete(id);
    };
    const handleDeleteConfirm = async () => {
        setDeleteConfirm(false);
        console.log("idToDelete", idToDelete);
 
        let data = {
            userId: idToDelete,
        }
        console.log("data to send", data);

        await assignService.deleteGifmisUser(data).then((res) => {
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
        })

        //navigate("/dashboard");
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
    }, []);

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


    const handleTransactionDetail = (id) => {
        navigate(`/dashboard/transactiondetails/${id}`);
    };

    return (
        <div className="container h-screen flex justify justify-start flex-col mt-1 mx-auto px-1 overflow-auto ">
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

            {/* Pagination
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

        {/* <img src="../images/login.jpg" alt="" />
      </div> */}
        </div>
    );
};

export default DeleteUserTransactions;
