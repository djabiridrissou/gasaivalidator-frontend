import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";

import {
  setStaffID,
  setLastName,
  setOtherNames,
  setDepartment,
  setBranch,
  setDepartmentList,
  setBranchList,
  toggleIsTeamLeader,
  setOrganizationList,
  setPassword,
  setConfirmPassword,
  setDepartmentChoose,
} from "../redux/features/registerSlice";
import axios from "axios";
import { server } from "../server/server";
import { addUser, getUsers } from "../redux/features/users";


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const staffID = useSelector((state) => state.register.staffID);
  const lastName = useSelector((state) => state.register.lastName);
  const otherNames = useSelector((state) => state.register.otherNames);
  const department = useSelector((state) => state.register.department);
  const branch = useSelector((state) => state.register.branch);
  const departmentList = useSelector((state) => state.register.departmentList);
  const branchList = useSelector((state) => state.register.branchList);
  const isTeamLeader = useSelector((state) => state.register.isTeamLeader);
  const organizationList = useSelector((state) => state.register.organizationList);
  const password = useSelector((state) => state.register.password);
  const confirmPassword = useSelector((state) => state.register.confirmPassword);

  let departmentChoose = useSelector((state) => state.register.departmentChoose);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const visible = { display: passwordVisible ? "block" : "none", };
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [organisationsToSend, setOrganisationsToSend] = useState([]);
  const [listOrganisation, setListOrganisation] = useState([]);

  const handleUserSelect = (id) => {
    const selectedUserId = id;
    if (!selectedUsers.includes(selectedUserId)) {
      setSelectedUsers([...selectedUsers, selectedUserId]);
    }
  };

  const handleOrganisationChange = (organis) => {
    console.log("choose", (organis))
/*     organisationsToSend.push(organis)
    dispatch(setOrganization(organis)) */
  }

  // Function to handle user removal
  const handleRemoveUser = (userId) => {
    const updatedUsers = selectedUsers.filter((id) => id !== userId);
    setSelectedUsers(updatedUsers);
  };

  useEffect(() => {

    departmentList.forEach((element) => {
      if (element.name === department) {
        dispatch(setDepartmentChoose(element));
      }
    });

    const getOrganizations = async () => {
      const response = await axios.get(`${server}/organisations`);
      //console.log(response.data);
      setListOrganisation(response.data);
    };
    getOrganizations();

    const getDepartments = async () => {
      const response = await axios.get(`${server}/departments`);
      dispatch(setDepartmentList(response.data));
      let departmentData = { departmentid: departmentChoose.id, };
      const BranchResponse = await axios.post(`${server}/branches`, departmentData);
      //console.log("branches", BranchResponse.data);
      dispatch(setBranchList(BranchResponse.data));
    };
    getDepartments();

    dispatch(getUsers()).unwrap().then(res => {
      //console.log("resUsers", res);
      setUsers(res.data);
    }).catch(error => {
      console.log(error);
    });

  }, [department, departmentChoose, dispatch]);


  const register = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError(true);
      setErrorMessage("Password must be 6 or more characters");
      setTimeout(() => setError(false), 3000);
    } else if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("The password and confirm password fields do not match.");
      setTimeout(() => setError(false), 3000);
    } else {
      let branchId = branchList.find(e => e.name === branch).id;

      const addUserDto = {
        data: {
          staffid: staffID,
          lastname: lastName,
          othernames: otherNames,
          isleader: isTeamLeader,
          ismember: true,
          
          password,
        },
        branchId,
        membersId: selectedUsers,
        //organisationsId: organisationsToSend,
      };
console.log("addUserDto", addUserDto)

      setError(false);
      dispatch(addUser(addUserDto)).unwrap().then((res) => {
   
        if (res.status == 200) {
          setError(false);
          navigate("/dashboard");
          window.location.reload();
        } else {
          setError(true);
          setErrorMessage("Error");
        }
      }).catch(error => {
        console.log(error);
        setError(true);
        setErrorMessage("Error");
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FontAwesomeIcon
          icon={faCircleNotch}
          className="animate-spin text-gray-500 text-4xl"
        />
      </div>
    );
  }


  return (
    <>
      <div className="min-h-screen flex items-center justify-between lg:px-40 cover">
        <div className="flex flex-col gap-5 justify-center  ">
          <h1 className="text-3xl font-bold text-gray-800">
            <div className="flex flex-col items-center -mt-14">
              <div className="flex flex-col gap-6">
                <div className="w-[80px] ml-[170px] mb-14">
                  <img src="/images/coat.png" alt="coat-of-arm" />
                </div>
                <div className="cube-container ml-4 sticky -mt-12 z-40 flex h-10 shrink-0 items-center gap-x-1 px-4  sm:gap-x-2 sm:px-6 lg:px-4">
                  <span className="font-bold text-xl text-black">
                    GoG SUPPLIERS PAYABLE VALIDATION
                  </span>
                </div>
              </div>
            </div>
          </h1>
          <div className="-mt-6">
            <p className="text-[16px] text-gray-900 ml-4 text-center"></p>
            <div className="cube-container ml-[20px] - z-40 flex-mt-4 flex h-10  items-center gap-x-1 px-4  sm:gap-x-2 sm:px-6 lg:px-4">
              Integrated MDAs/MMDAs Audit Solutions For
              <span className="bg-red-500 w-5 h-5 flex items-center justify-center text-white mr-0 font-bold face front right back animate-bounce animate-shake">
                G
              </span>
              <span className="bg-yellow-500 w-5 h-5 flex items-center justify-center text-white font-bold face front right back animate-bounce">
                A
              </span>
              <span className="bg-green-500 w-5 h-5 flex items-center justify-center text-white font-bold face front right back animate-shake">
                S
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 mx-[10px]  sm:w-full sm:max-w-md">
          <div className=" py-5 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-3" onSubmit={register}>
              <div>
                <label htmlFor="staffID" className="block text-sm font-medium ">
                  Staff ID
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="staffID"
                    id="staffID"
                    value={staffID}
                    onChange={(e) => dispatch(setStaffID(e.target.value))}
                    required
                    autoComplete="staffID"
                    placeholder="Staff ID"
                    className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium "
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => dispatch(setLastName(e.target.value))}
                    required
                    autoComplete="lastName"
                    placeholder="Full Name"
                    className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                  />
                </div>
              </div>
              {/* <div>
                <label
                  htmlFor="otherNames"
                  className="block text-sm font-medium "
                >
                  Other Names
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="otherNames"
                    value={otherNames}
                    onChange={(e) => dispatch(setOtherNames(e.target.value))}
                    required
                    autoComplete="otherNames"
                    placeholder="Any Other Name"
                    className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                  />
                </div>
              </div> */}
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium mb-1 "
                >
                  Department
                </label>
                <div className="flex items-center gap-1">
                  <select
                    name="department"
                    value={department}
                    onChange={(e) => dispatch(setDepartment(e.target.value))}
                    id="department"
                    required
                    className={`block w-full text-[0.9rem] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
                  >
                    <option key="default" value="" className="">
                      -----------
                    </option>
                    {departmentList?.map((department) => (
                      <option key={department.id} value={department.name}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="branch"
                  className="block text-sm font-medium mb-1 "
                >
                  Branch
                </label>
                <div className="flex items-center gap-1">
                  <select
                    name="branch"
                    value={branch}
                    onChange={(e) => dispatch(setBranch(e.target.value))}
                    id="branch"
                    required
                    className={`block w-full text-[0.9rem] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
                  >
                    <option key="default" value="" className="">
                      -----------
                    </option>
                    {branchList?.map((branch) => (
                      <option key={branch.id} value={branch.name}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3 ">
                <label className="block text-sm font-medium">Is the user a team leader ?</label>
                <div className="flex space-x-4 justify-start ">
                  <label>
                    <input
                      type="checkbox"
                      checked={!isTeamLeader}
                      onChange={() => dispatch(toggleIsTeamLeader())}
                      className="mr-1"
                    />
                    No
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={isTeamLeader}
                      onChange={() => dispatch(toggleIsTeamLeader())}
                      className="mr-1"
                    />
                    Yes
                  </label>
                </div>
              </div>

              <div>
                {isTeamLeader && (
                  <div className="space-y-3">
                 {/*    <div>
                      <label
                       
                        className="block text-sm font-medium mb-1 "
                      >
                        Organization
                      </label>
                      <div className="flex items-center gap-1">
                        <select
                          name=""
                          id="orglist"
                          
                          onChange={(e) => organisationsToSend.push(parseInt(e.target.value))}
                          required
                          className={`block w-full text-[0.9rem] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
                        >
                          {listOrganisation?.map((organis) => (
                            <option key={organis.id} value={organis.id}>
                              {organis.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>*/}

                    <div>
                      <label htmlFor="teamMembers" className="block text-sm font-medium mb-1">
                        Team Member(s)
                      </label>
                      <div className="flex items-center gap-1">
                      
                        <select
                          name=""
                          id="memberlist"
                          required
                          className={`block w-full text-[0.9rem] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
                          
                          multiple
                        >
                          {users?.map((user) => (
                            <option key={user.id} value={user.id} onClick={() => handleUserSelect(user.id)}>
                              {user.lastname}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="selected-users-container">
                        {selectedUsers.map((userId) => (
                          <div key={userId} className="selected-user">
                            <span className="user-name">
                              {users.find((user) => user.id === userId).lastname}
                            </span>
                            <span
                              className="remove-user"
                              onClick={() => handleRemoveUser(userId)}
                            >
                              X
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap overflow-scroll">
                        
                      </div>
                    </div>
                  </div>
                )}
              </div> 

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                    required
                    placeholder="Password"
                    className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                  />
                  {passwordVisible ? (
                    <AiOutlineEye
                      style={visible}
                      size={25}
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() => setPasswordVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      style={visible}
                      size={25}
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() => setPasswordVisible(true)}
                    />
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    required
                    placeholder="Confirm password"
                    onChange={(e) =>
                      dispatch(setConfirmPassword(e.target.value))
                    }
                    className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                  />
                  {passwordVisible ? (
                    <AiOutlineEye
                      style={visible}
                      size={25}
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() => setPasswordVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      style={visible}
                      size={25}
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() => setPasswordVisible(true)}
                    />
                  )}
                </div>
              </div>

              <Transition
                show={error}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="bg-red-100 text-red-900 p-2 rounded-md mb-0 text-center">
                  {error && errorMessage}
                </div>
              </Transition>

              <div>
                <button
                  className="bg-gray-800 hover:bg-gray-700 transition duration-300 relative w-full  py-2 border border-transparent rounded-md font-medium text-white focus:ring-2"
                  type="submit"
                >
                  Continue
                </button>
              </div>
              <div className="flex items-center justify-center w-full">
                <Link
                  to="/dashboard"
                  className="text-blue-500 focus:ring-1 focus:outline-none focus:ring-blue-500"
                >
                  Dashboard
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
