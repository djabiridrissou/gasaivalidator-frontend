import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../redux/features/users";
import { FaArrowDown } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCurentUser } from "../redux/features/auth";
import axios from "axios";
import { server } from "../server/server";

const TeamMembers = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const response = dispatch(getUsers()).unwrap().then((res) => {
            console.log("users", res.data);
        });
        dispatch(getCurentUser()).unwrap().then(res => {
            console.log("res", res.user.id);
            setCurrentUser(res.user);
        }).catch(error => {
            console.log(error);
        });
    }, []);
    const usersList = [];
    users?.map((item, itemIndex) => {
        if (!(item.isleader)) {
            usersList.push(item);
        }
    })

    const handleDeleteUser = (id) => {
        console.log("dans delete", id);
        const response = axios.delete(`${server}/users/${id}`);
    }

    const isAdmin = currentUser.role?.roleName == "admin";


    return (
        <div className="container h-screen flex justify justify-start flex-col mt-1 mx-auto px-1 overflow-auto ">
            <h1 className="text-[16px] font-bold">Team Members</h1>
            <div className="bg-white rounded-lg p-2 border shadow-md">
                <div className="flex justify-between mb-2">
                </div>
                <div className="max-h-[80vh] overflow-y-scroll">
                    <table className="table-auto w-full bg-white text-[13px]">
                        <thead className="sticky -top-1 bg-gray-100">
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200  ">
                                    <span className="inline-flex items-start">
                                        STAFF ID{" "}
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
                                        LAST NAME{" "}
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
                                {/* <th className="border border-gray-200  ">
                                    DELETE
                                </th> */}

                            </tr>
                        </thead>
                        <tbody>
                            {usersList && usersList.length > 0 ? (
                                usersList?.map((item, itemIndex) => (
                                    <tr key={itemIndex}>
                                        <td className="border-y text-left ">
                                            {item?.staffid}
                                        </td>
                                        <td className="border-y text-left ">
                                            {(item?.lastname)}
                                        </td>
                                        {/* <td className="border-y text-right ">
                                            <FaArrowDown
                                                style={{
                                                    pointerEvents: !isAdmin ? 'not-allowed' : 'auto',
                                                }}
                                                onClick={() => handleDeleteUser(item?.id)}
                                                className="cursor-pointer text-red-600"
                                                size={20}
                                            />
                                        </td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border-y text-center py-2" colSpan="12">
                                        <span className="text-red-500 font-extrabold text-[12px]">
                                            No Leaders found
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

export default TeamMembers;
