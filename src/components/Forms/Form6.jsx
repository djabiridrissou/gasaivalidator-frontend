import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleIsItemSupplied,
  toggleIsServiceCompleted,
  toggleIsWorkCompleted,
  addSuppliance,
  updateSuppliance,
  updateService,
  updateWork,
  removeSuppliances,
  setRegionalLocation,
  setDistrictLocation,
} from "../../redux/features/form6Slice";
import { districtData } from "../../utils/district.Js";

const Form6 = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentPath = window.location.pathname;
  console.log("Chemin actuel : " + currentPath);
  const suppliances = useSelector((state) => state.form6.suppliances);
  const isItemSupplied = useSelector((state) => state.form6.isItemSupplied);
  const isServiceCompleted = useSelector(
    (state) => state.form6.isServiceCompleted
  );
  const isWorkCompleted = useSelector((state) => state.form6.isWorkCompleted);
  const services = useSelector((state) => state.form6.services);
  const works = useSelector((state) => state.form6.works);
  const regionalLocation = useSelector((state) => state.form6.regionalLocation);
  const districtLocation = useSelector((state) => state.form6.districtLocation);
  const [districtList, setDistrictList] = useState([]);

  const formatNumber = (value) => {
    // Remove non-numeric characters except the dot
    const numericValue = value.replace(/[^0-9.]/g, "");
  
    // Split the value into integer and decimal parts
    const [integerPart, decimalPart] = numericValue.split(".");
  
    // Format the integer part with thousands separators
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );
  
    // Limit the decimal part to two decimal places
    const formattedDecimalPart =
      decimalPart && decimalPart.length > 2
        ? decimalPart.slice(0, 2)
        : decimalPart || "00";
  
    // Combine the integer and decimal parts
    const formattedValue =
      decimalPart === undefined
        ? formattedIntegerPart
        : `${formattedIntegerPart}.${formattedDecimalPart}`;
  
    return formattedValue;
  };
  /*  const certificationOfCompletionDate = useSelector((state) => state.form6.certificationOfCompletionDate);
 
   const percentageOfCompletion = useSelector((state) => state.form6.percentageOfCompletion);
   const serviceFileLabelNumber = useSelector((state) => state.form6.serviceFileLabelNumber); */

  const addNewSuppliance = () => {
    dispatch(addSuppliance());
  };

  const regionsInGhana = [
    { id: "1", name: "Ahafo" },
    { id: "2", name: "Ashanti" },
    { id: "3", name: "Bono East" },
    { id: "4", name: "Bono Ahafo" },
    { id: "5", name: "Central" },
    { id: "6", name: "Eastern" },
    { id: "7", name: "Greater Accra" },
    { id: "8", name: "North East" },
    { id: "9", name: "Northern" },
    { id: "10", name: "Oti" },
    { id: "11", name: "Savannah" },
    { id: "12", name: "Upper East" },
    { id: "13", name: "Upper West" },
    { id: "14", name: "Western" },
    { id: "15", name: "Western North" },
    { id: "16", name: "Volta" },
  ];

  

  const updateDistrict = () => {
    console.log("dans district", districtData[regionalLocation]);
  }

  const handleSupplianceChange = (index, fieldName, value) => {
    dispatch(updateSuppliance({ index, fieldName, value }));
  };
  const handleServiceChange = (index, fieldName, value) => {
    dispatch(updateService({ index, fieldName, value }));
  };

  const handleWorkChange = (index, fieldName, value) => {
    dispatch(updateWork({ index, fieldName, value }));
  };

  const removeSuppliance = (index) => {
    const updatedSuppliances = [...suppliances];
    updatedSuppliances.splice(index, 1);
    dispatch(removeSuppliances(updatedSuppliances));
  };

  const handleRegionalLocationChange = (e) => {
    dispatch(setRegionalLocation(e.target.value));
    updateDistrict();
  };

  const handleDistrictLocationChange = (e) => {
    dispatch(setDistrictLocation(e.target.value));
  };

  const expenditureType = useSelector((state) => state.form4.expenditureType);
  const workType = useSelector((state) => state.form4.workType);

  return (
    <div>
      {expenditureType === "Goods" && (
        <div className="mt-6">
          <div className="flex flex-col items-center">
            <label htmlFor="isItemSupplied" className=" font-semibold">
              Is the item supplied ?
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="isItemSuppliedYes"
                  name="isItemSupplied"
                  checked={isItemSupplied}
                  onChange={() => dispatch(toggleIsItemSupplied())}
                  className="form-checkbox h-4 w-4"
                />
                <span className="ml-1 text-[13px]">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="checkbox"
                  id="isItemSuppliedNo"
                  name="isItemSupplied"
                  checked={!isItemSupplied}
                  onChange={() => dispatch(toggleIsItemSupplied())}
                  className="form-checkbox h-4 w-4"
                />
                <span className="ml-1 text-[13px]">No</span>
              </label>
            </div>
          </div>

          {isItemSupplied && (
            <div>
              {suppliances.map((suppliance, index) => (
                <Fragment key={index}>
                  <div className="flex justify-center mt-5">
                    <div>
                      <label
                        htmlFor="sraDate"
                        className="text-[13.5px] text-gray-700"
                      >
                        Date of Store Receipt
                      </label>
                      <input
                        type="date"
                        id="sraDate"
                        value={suppliance.sraDate}
                        onChange={(e) =>
                          handleSupplianceChange(
                            index,
                            "sraDate",
                            e.target.value
                          )
                        }
                        className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                      />
                    </div>{" "}
                    <div>
                      <label
                        htmlFor="receiptBy"
                        className="text-[13.5px] text-gray-700"
                      >
                        Receipt by
                      </label>
                      <input
                        type="text"
                        id="receiptBy"
                        value={suppliance.receiptBy}
                        onChange={(e) =>
                          handleSupplianceChange(
                            index,
                            "receiptBy",
                            e.target.value
                          )
                        }
                        placeholder="Receiving Officer's Name"
                        className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                      />
                    </div>{" "}
                    <div>
                      <label
                        htmlFor="quantity"
                        className="text-[13.5px] text-gray-700"
                      >
                        Quantity
                      </label>
                      <input
                        type="text"
                        id="quantity"
                        value={suppliance.quantity}
                        onChange={(e) => {
                          const formattedValue = formatNumber(e.target.value);
                          handleSupplianceChange(
                            index,
                            "quantity",
                          formattedValue
                          )
                        }}
                        placeholder="Quantity"
                        className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="fln"
                        className="text-[13.5px] text-gray-700"
                      >
                        File Label No.
                      </label>
                      <input
                        type="text"
                        id="fln"
                        value={suppliance.fileLabelNumber}
                        onChange={(e) =>
                          handleSupplianceChange(
                            index,
                            "fileLabelNumber",
                            e.target.value
                          )
                        }
                        placeholder="File Label No"
                        className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                      />
                    </div>
                    <button
                      className="font-medium bg-green-700 px-[0.8rem] py-[0.15rem] mt-6"
                      onClick={addNewSuppliance}
                    >
                      <span>+</span>
                    </button>
                    {index > 0 && (
                      <button
                        className="font-medium bg-red-700 px-[0.8rem] py-[0.15rem] mt-6 ml-2"
                        onClick={() => removeSuppliance(index)}
                      >
                        <span>-</span>
                      </button>
                    )}
                  </div>
                </Fragment>
              ))}
            </div>
          )}
          {currentPath.startsWith("/dashboard/transactiondetails") && (
            <div className="flex justify-center space-x-2 mt-6">
              <button
                onClick={() => navigate(-1)}
                className="bg-black text-white px-4 py-2 border-full rounded"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (isItemSupplied) {
                    const supplianceAreMissing = suppliances.some(
                      (suppliance) =>
                        !suppliance.sraDate || !suppliance.receiptBy || !suppliance.quantity || !suppliance.fileLabelNumber
                    );
                    if (supplianceAreMissing) {
                      return;
                    }
                  }
                  navigate(`/dashboard/transactiondetails/${id}/6`)
                }}
                className={`bg-blue-500 text-white px-4 py-2 border-full rounded ${!isItemSupplied && "bg-green-800/50"
                  }`}
                disabled={!isItemSupplied} // Disable the button if isItemSupplied is false
              >
                Next
              </button>
            </div>
          )}

          {currentPath.startsWith("/dashboard/edittransaction") && (
            <div className="flex justify-center space-x-2 mt-6">
              <button
                onClick={() => navigate(-1)}
                className="bg-black text-white px-4 py-2 border-full rounded"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (isItemSupplied) {
                    const supplianceAreMissing = suppliances.some(
                      (suppliance) =>
                        !suppliance.sraDate || !suppliance.receiptBy || !suppliance.quantity || !suppliance.fileLabelNumber
                    );
                    if (supplianceAreMissing) {
                      return;
                    }
                  }
                  navigate(`/dashboard/edittransaction/${id}/6`)
                }}
                className={`bg-blue-500 text-white px-4 py-2 border-full rounded ${!isItemSupplied && "bg-green-800/50"
                  }`}
                disabled={!isItemSupplied} // Disable the button if isItemSupplied is false
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
      {expenditureType === "Service" && (
        <div className="mt-6">
          <div className="flex flex-col items-center">
            <label htmlFor="isItemSupplied" className=" font-semibold ">
              Is the service successfully completed ?
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="isItemSuppliedYes"
                  name="isItemSupplied"
                  checked={isServiceCompleted}
                  onChange={() => dispatch(toggleIsServiceCompleted())}
                  className="form-checkbox h-4 w-4"
                />
                <span className="ml-1 text-[13px]">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="checkbox"
                  id="isItemSuppliedNo"
                  name="isItemSupplied"
                  checked={!isServiceCompleted}
                  onChange={() => dispatch(toggleIsServiceCompleted())}
                  className="form-checkbox h-4 w-4"
                />
                <span className="ml-1 text-[13px]">No</span>
              </label>
            </div>
          </div>

          {isServiceCompleted && (
            <div>
              {services.map((service, index) => (
                <Fragment key={index}>
                  <div className="flex justify-center gap-4">
                    <div className="">
                      <label
                        htmlFor="sraDate"
                        className="text-[13.5px] text-gray-700"
                      >
                        Certification of Completion Date
                      </label>
                      <input
                        type="date"
                        id="certificationOfCompletionDate"
                        name="certificationOfCompletionDate"
                        value={service.certificationOfCompletionDate}
                        onChange={(e) =>
                          handleServiceChange(
                            index,
                            "certificationOfCompletionDate",
                            e.target.value
                          )
                        }
                        className="appearance-none block w-[90%] text-[0.9rem] px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                      />
                    </div>{" "}
                    <div>
                      <label
                        htmlFor="receiptBy"
                        className="text-[13.5px] text-gray-700"
                      >
                        Percentage of completion
                      </label>
                      <input
                        type="text"
                        id="percentageOfCompletion"
                        name="percentageOfCompletion"
                        value={service.percentageOfCompletion}
                        onChange={(e) =>
                          handleServiceChange(
                            index,
                            "percentageOfCompletion",
                            e.target.value
                          )
                        }
                        placeholder="Percentage of completion"
                        className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="fln"
                        className="text-[13.5px] text-gray-700"
                      >
                        Certification Issued By
                      </label>
                      <input
                        type="text"
                        id="certificationIssuedBy"
                        name="certificationIssuedBy"
                        value={service.certificationIssuedBy}
                        onChange={(e) =>
                          handleServiceChange(
                            index,
                            "fileLabelNumber",
                            e.target.value
                          )
                        }
                        placeholder="Certification Issued By"
                        className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="fln"
                        className="text-[13.5px] text-gray-700"
                      >
                        Designation
                      </label>
                      <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={service.designation}
                        onChange={(e) =>
                          handleServiceChange(
                            index,
                            "fileLabelNumber",
                            e.target.value
                          )
                        }
                        placeholder="Designation"
                        className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="fln"
                        className="text-[13.5px] text-gray-700"
                      >
                        File Label Number
                      </label>
                      <input
                        type="text"
                        id="serviceFileLabelNumber"
                        name="serviceFileLabelNumber"
                        value={service.fileLabelNumber}
                        onChange={(e) =>
                          handleServiceChange(
                            index,
                            "fileLabelNumber",
                            e.target.value
                          )
                        }
                        placeholder="File Label Number"
                        className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                      />
                    </div>

                  </div>
                </Fragment>
              ))}
            </div>
          )}

          <div className="flex justify-center space-x-2 mt-6">
            <button
              onClick={() => navigate(-1)}
              className="bg-black text-white px-4 py-2 border-full rounded"
            >
              Back
            </button>
            {currentPath.startsWith("/dashboard/transactiondetails") && (
              <div>
                <button
                  onClick={() => {
                    if (isServiceCompleted) {
                      const serviceAreMissing = services.some(
                        (service) =>
                          !service.certificationOfCompletionDate || !service.percentageOfCompletion || !service.certificationIssuedBy || !service.designation || !service.fileLabelNumber
                      );
                      if (serviceAreMissing) {
                        return;
                      }
                    }
                    navigate(`/dashboard/transactiondetails/${id}/6`)
                  }}
                  className={`bg-blue-500 text-white px-4 py-2 border-full rounded ${expenditureType === "Service" && "bg-green-800/50"
                    }`}
                  disabled={expenditureType === "Service"}
                >
                  Next
                </button>
              </div>
            )}
            {currentPath.startsWith("/dashboard/edittransaction") && (
              <div>
                <button
                  onClick={() => navigate(`/dashboard/edittransaction/${id}/6`)}
                  className={`bg-blue-500 text-white px-4 py-2 border-full rounded ${expenditureType === "Service" && "bg-green-800/50"
                    }`}
                  disabled={expenditureType === "Service"}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {expenditureType === "Works" &&
        (workType === "Building" ||
          workType === "Structure Improvement" ||
          workType === "Pavements") && (
          <div className="mt-6">
            <div className="flex flex-col items-center">
              <label htmlFor="isItemSupplied" className=" font-semibold">
                Is the work successfully completed ?
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id="isWorkCompletedYes"
                    name="isWorkCompleted"
                    checked={isWorkCompleted}
                    onChange={() => dispatch(toggleIsWorkCompleted())}
                    className="form-checkbox h-4 w-4"
                  />
                  <span className="ml-1 text-[13px]">Yes</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="checkbox"
                    id="isWorkCompletedYes"
                    name="isWorkCompleted"
                    checked={!isWorkCompleted}
                    onChange={() => dispatch(toggleIsWorkCompleted())}
                    className="form-checkbox h-4 w-4"
                  />
                  <span className="ml-1 text-[13px]">No</span>
                </label>
              </div>
            </div>

            {isWorkCompleted && (
              <div>
                {works?.map((work, index) => (
                  <Fragment key={index}>
                    <div className="flex justify-center mt-3">
                      <div className="">
                        <label
                          htmlFor="sraDate"
                          className="text-[13.5px] text-gray-700"
                        >
                          Certification of Completion Date
                        </label>
                        <input
                          type="date"
                          id="certificationOfCompletionDate"
                          name="certificationOfCompletionDate"
                          value={work.certificationOfCompletionDate}
                          onChange={(e) =>
                            handleWorkChange(
                              index,
                              "certificationOfCompletionDate",
                              e.target.value
                            )
                          }
                          className="appearance-none block w-[90%] text-[0.9rem] px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                        />
                      </div>{" "}
                      <div>
                        <label
                          htmlFor="receiptBy"
                          className="text-[13.5px] text-gray-700"
                        >
                          Percentage of completion
                        </label>
                        <input
                          type="text"
                          id="percentageOfCompletion"
                          name="percentageOfCompletion"
                          value={work.percentageOfCompletion}
                          onChange={(e) =>
                            handleWorkChange(
                              index,
                              "percentageOfCompletion",
                              e.target.value
                            )
                          }
                          placeholder="Percentage of completion"
                          className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="fln"
                          className="text-[13.5px] text-gray-700"
                        >
                          Certification Issued By
                        </label>
                        <input
                          type="text"
                          id="certificationIssuedBy"
                          name="certificationIssuedBy"
                          value={work.certificationIssuedBy}
                          onChange={(e) =>
                            handleWorkChange(
                              index,
                              "certificationIssuedBy",
                              e.target.value
                            )
                          }
                          placeholder="Certification Issued By"
                          className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="fln"
                          className="text-[13.5px] text-gray-700"
                        >
                          Designation
                        </label>
                        <input
                          type="text"
                          id="designation"
                          name="designation"
                          value={work.designation}
                          onChange={(e) =>
                            handleWorkChange(
                              index,
                              "designation",
                              e.target.value
                            )
                          }
                          placeholder="Designation"
                          className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="fln"
                          className="text-[13.5px] text-gray-700"
                        >
                          File Label Number
                        </label>
                        <input
                          type="text"
                          id="serviceFileLabelNumber"
                          name="serviceFileLabelNumber"
                          value={work.fileLabelNumber}
                          onChange={(e) =>
                            handleWorkChange(
                              index,
                              "fileLabelNumber",
                              e.target.value
                            )
                          }
                          placeholder="File Label Number"
                          className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="mb-3 flex flex-col items-center flex-wrap">
                        <label
                          htmlFor="paymentStatus"
                          className="block mt-5 mb-2 text-sm text-[13.5px] text-gray-700 font-semibold"
                        >
                          Select Work Regional Location
                        </label>
                        <select
                          name="regionalLocation"
                          id="regionalLocation"
                          value={regionalLocation}
                          onChange={handleRegionalLocationChange}
                          className={`block text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
                        >
                          <option value="">------------------------</option>

                          {regionsInGhana?.map((region) => (
                            <option key={region.id} value={region.name}>
                              {region.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="">
                      <div className="mb-3 flex flex-col items-center flex-wrap">
                        <label
                          htmlFor="paymentStatus"
                          className="block mt-3 mb-2 text-sm text-[13.5px] text-gray-700 font-semibold"
                        >
                          Enter Work District Location
                        </label>
                        <input
                          name="districtLocation"
                          id="districtLocation"
                          type="text"
                          value={districtLocation}
                          onChange={handleDistrictLocationChange}
                          className={` block text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
                        />


                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            )}
            <div className="flex space-x-2 mt-6 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="bg-black text-white px-4 py-2 border-full rounded"
              >
                Back
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default Form6;
