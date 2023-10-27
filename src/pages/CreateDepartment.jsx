import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setDepartmentName } from "../redux/features/branch_departmentSlice";
import axios from "axios";
import { server } from "../server/server";

const CreateDepartment = () => {
  const dispatch = useDispatch();
  const departmentName = useSelector(
    (state) => state.branch_department.departmentName
  );

  console.log(departmentName);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = { headers: { "Content-Type": "application/json" } };
    const newForm = new FormData();

    newForm.append("name", departmentName);

    try {
      const response = await axios.post(
        `${server}/departments/add`,
        newForm,
        config
      );

      if (response.data) {
        dispatch(setDepartmentName(""));
      }
      console.log(response.data);
      console.log("successfull");
    } catch (error) {
      console.log("not successfull");
      console.log(error);
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
      <div className="min-h-[70vh] flex items-center justify-between lg:px-40 cover">
        <div className="flex flex-col gap-5 justify-center  ">
          <h1 className="text-3xl font-bold text-gray-800">
            {/* <span className="bg-red-500 w-5 h-5">A</span> <span className="bg-yellow-500 w-5 h-5">I</span> <span className="bg-green-500 w-5 h-5">R</span> HANDLERS ANALYTICS */}

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
        </div>

        <div className="mt-6 mx-[10px]  sm:w-full sm:max-w-md">
          <div className=" py-5 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                {/* <label htmlFor="staffID" className="block text-sm font-medium ">
                  Department Name
                </label> */}
                <div className="mt-1">
                  <input
                    type="text"
                    name="departmentName"
                    id="departmentName"
                    value={departmentName}
                    onChange={(e) =>
                      dispatch(setDepartmentName(e.target.value))
                    }
                    required
                    autoComplete="departmentName"
                    placeholder="Department Name"
                    className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                  />
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="bg-gray-400 hover:bg-gray-300 transition duration-300 relative px-4  py-2 border border-transparent rounded-md font-medium text-white focus:ring-2"
                  type="submit"
                >
                  Back
                </button>
                <button
                  className="bg-gray-800 hover:bg-gray-700 transition duration-300 relative px-4  py-2 border border-transparent rounded-md font-medium text-white focus:ring-2"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateDepartment;
