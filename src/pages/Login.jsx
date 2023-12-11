import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Transition } from "@headlessui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { login, setConnectedUserToLocalStorage, signOut } from "../redux/features/auth";
import axios from "axios";
import { server } from "../server/server";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { CiWarning } from "react-icons/ci";

const Login = () => {
  const [staffID, setStaffID] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const visible = {
    display: passwordVisible ? "block" : "none",
  };

  /*   const { user, setUser } = useGlobalContext(); */

  useEffect(() => {
    dispatch(signOut());
  }, []);

  const submit = async (e) => {

    e.preventDefault();
    // console.log(setStaffID);
    // try {
    //   const response = await axios.post(
    //     `${server}auth/login`,
    //     {
    //       staffid: staffID,
    //       password,
    //     }
    //     // { withCredentials: true }
    //   );

    //   console.log(response.data);
    //   // setAuthenticated(true);
    //   // setUser(response.data.user);
    //   // setLoading(true)

    // } catch (error) {
    //   console.log(error);
    //   setError(true);
    //   setErrorMessage("Invalid credentials");
    //   setTimeout(() => setError(false), 3000);
    // }

    dispatch(login({ data: { staffid: staffID, password } })).unwrap().then((res) => {
      if (res.status == 200) {
        dispatch(setConnectedUserToLocalStorage(res.data)).unwrap().then((res) => {
          navigate("/dashboard");
        }).catch(error => {
          navigate("/dashboard");
        });
      }
      setError(true);
      setErrorMessage("Invalid credentials");
    }).catch(error => {
      console.log(error);
      setError(true);
      setErrorMessage("Invalid credentials");
    });
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

  const AnimatedText = ({ originalText, delay, textIncrement }) => {
    useEffect(() => {
      const interval = setInterval(() => {
        if (currentIndex < originalText.length) {
          setDisplayedText((prevText) => prevText + originalText[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + textIncrement);
        } else {
          clearInterval(interval);
        }
      }, delay);

      return () => clearInterval(interval);
    }, [currentIndex, originalText, delay, textIncrement]);

    return (
      <p
        className="text-gray-900 text-[18px] ml-4 text-center"
        dangerouslySetInnerHTML={{ __html: displayedText }}
      />
    );
  };

  return (
    <>
      {/* <div className="cover">
      <h1>image here</h1>
    </div> */}
      <div className="min-h-screen flex items-center justify-between lg:px-40 cover">
        <div className="flex flex-col gap-5 justify-center  ">
          <h1 className="text-3xl font-bold text-gray-800">
            {/* <span className="bg-red-500 w-5 h-5">A</span> <span className="bg-yellow-500 w-5 h-5">I</span> <span className="bg-green-500 w-5 h-5">R</span> HANDLERS ANALYTICS */}

            <div className="flex flex-col items-center -mt-14">
              <div className="flex flex-col gap-6">
                <div className="w-[80px] ml-[170px] mb-14">
                  <img src="/images/coat.png" alt="coat-of-arm" />
                </div>
                <div className="cube-container ml-4 sticky -mt-12 z-40 flex h-10 shrink-0 items-center gap-x-1 px-4  sm:gap-x-2 sm:px-6 lg:px-4">
                  {/*     <div className="bg-red-500 w-7 h-7 flex items-center justify-center text-white mr-0 font-bold face front right back">
                    A
                  </div>
                  <div className="bg-[#f1b92bd9] w-7 h-7 flex items-center justify-center text-white font-bold face front right back">
                    I
                  </div>
                  <div className="bg-green-500 w-7 h-7 flex items-center justify-center text-white font-bold face front right back">
                    R
                  </div> */}
                  <span className="font-bold text-xl text-black">
                    GoG SUPPLIERS PAYABLE VALIDATION
                  </span>
                </div>
              </div>
            </div>
          </h1>
          {/* <AnimatedText
            originalText={
              "Integrated MDAs/MMDAs Artificial Intelligence Audit Solutions" + "</br>" + " for  "
            }
            delay={30}
            textIncrement={1}
          /> */}
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
          {/* <p className="text-[16px] text-gray-900 ml-4 text-center">
              Integrated MDAs/MMDAs Audit Solutions 
            </p>
            <div className="cube-container ml-[140px] - z-40 flex-mt-4 flex h-10  items-center gap-x-1 px-4  sm:gap-x-2 sm:px-6 lg:px-4">
              For
              <span className="bg-red-500 w-7 h-7 flex items-center justify-center text-white mr-0 font-bold face front right back animate-bounce animate-shake">
                G
              </span>
              <span className="bg-yellow-500 w-7 h-7 flex items-center justify-center text-white font-bold face front right back animate-bounce">
                A
              </span>
              <span className="bg-green-500 w-7 h-7 flex items-center justify-center text-white font-bold face front right back animate-shake">
                S
              </span>
            </div> */}

          {/* <div className="flex gap-6 items-center justify-center mt-3 ml-8">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
              <img
                src="/images/gacl.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
              <img
                src="/images/gra.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
              <img
                src="/images/eoco.jpg"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
              <img
                src="/images/bni.png"
                alt=""
                className="w-[70%] h-full object-contain"
              />
            </div>
            <div className="w-[70px] h-[40px] rounded-full overflow-hidden -ml-6">
              <img
                src="/images/mot.png"
                alt=""
                className="w-[100%] h-full object-contain"
              />
            </div>
          </div> */}
        </div>

        <div className="mt-6 mx-[10px]  sm:w-full sm:max-w-md">
          <div className="tooltip ml-8">
            <CiWarning className="info-icon w-6 h-6 text-yellow-600" />
            <span className="tooltiptext">When you log in use the "Profile" section under your username to change your password</span>
          </div>
          <div className=" py-5 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-5" onSubmit={submit}>
              <div>
                {/* <label htmlFor="email" className="block text-sm font-medium ">
                  Email
                </label> */}
                <div className="mt-1">
                  <input
                    type="text"
                    name="staffID"
                    value={staffID}
                    onChange={(e) => setStaffID(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="Staff ID"
                    className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                  />
                </div>
              </div>
              <div>
                {/* <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label> */}
                <div className="mt-1 relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              <Transition
                show={error}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="bg-red-100 text-red-900 p-[5px] rounded-md mb-2 text-center">
                  {error && errorMessage}
                </div>
              </Transition>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="remember-me"
                    checked={rememberMe}
                    onChange={() => setRememberMe((prev) => !prev)}
                    id="remember-me"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2  text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-blue-500 text-sm">
                  <a
                    href="forgot password"
                    className="focus:ring-1 focus:outline-none focus:[#35A6F9]"
                  >
                    Forgot your password
                  </a>
                </div>
              </div>
              <div>
                <button
                  className="bg-gray-800 hover:bg-gray-700 transition duration-300 relative w-full  py-2 border border-transparent rounded-md font-medium text-white focus:ring-2"
                  type="submit"
                >
                  Continue
                </button>
              </div>

              {/* <div className="flex items-center justify-center w-full">
                <p className="mr-2">New user?</p>
                <Link
                  to="/register"
                  className="text-blue-500 focus:ring-1 focus:outline-none focus:ring-blue-500"
                >
                  Register
                </Link>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
