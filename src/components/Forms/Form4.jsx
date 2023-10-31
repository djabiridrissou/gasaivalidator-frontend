import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setExpenditureType,
  setWorkType,
  toggleAvailableContracts,
  addContract,
  addWorksContract,
  addServiceContract,
  updateContract,
  removeContracts,
  removeServiceContract,
  removeWorksContract,
  updateServiceContract,
  updateWorksContract,
  updateRoadContract,
  setBuildingType,
  setNumberOfRooms,
  updateJudgement,
  toggleAvailableJudgement,
  setCompensationType,
  setAllowanceName,
  setDescription,

} from "../../redux/features/form4Slice.js";

import { formatNumber } from "../../functions/helperFunctions";
import { current } from "@reduxjs/toolkit";
const Form4 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPath = window.location.pathname;
  console.log("Chemin actuel : " + currentPath)
  const expenditureType = useSelector((state) => state.form4.expenditureType);
  const compensationType = useSelector((state) => state.form4.compensationType);
  const workType = useSelector((state) => state.form4.workType);
  const availableContracts = useSelector(
    (state) => state.form4.availableContracts
  );
  const goodsContracts = useSelector((state) => state.form4.goodsContracts);
  const servicesContracts = useSelector(
    (state) => state.form4.servicesContracts
  );
  const worksContracts = useSelector((state) => state.form4.worksContracts);
  const roadsContracts = useSelector((state) => state.form4.roadsContracts);
  const numberOfRooms = useSelector((state) => state.form4.numberOfRooms);
  const description = useSelector((state) => state.form4.description);
  const judgements = useSelector((state) => state.form4.judgements);
  const availableJudgement = useSelector(
    (state) => state.form4.availableJudgement
  );
  const allowanceName = useSelector((state) => state.form4.allowanceName);
  console.log("cpt", compensationType);

  console.log("allwnce", allowanceName);
  const addNewContract = () => {
    dispatch(addContract());
  };

  const addNewWorkContract = () => {
    dispatch(addWorksContract());
  };

  const addNewServiceContract = () => {
    dispatch(addServiceContract());
  };

  const handleContractChange = (index, fieldName, value) => {
    //console.log("dans contrat change", index, fieldName, value);
    dispatch(updateContract({ index, fieldName, value }));
  };

  const handleJudgementChange = (index, fieldName, value) => {
    dispatch(updateJudgement({ index, fieldName, value }));
  };

  const handleWorkContractChange = (index, fieldName, value) => {
    //console.log("dans contrat change", index, fieldName, value);
    dispatch(updateWorksContract({ index, fieldName, value }));
  };
  const handleServiceContractChange = (index, fieldName, value) => {
    //console.log("dans contrat change", index, fieldName, value);
    dispatch(updateServiceContract({ index, fieldName, value }));
  };

  const handleRoadContractChange = (index, fieldName, value) => {
    dispatch(updateRoadContract({ index, fieldName, value }));
  };

  const removeContract = (index) => {
    const updatedContracts = [...goodsContracts];
    updatedContracts.splice(index, 1);
    dispatch(removeContracts(updatedContracts));
  };

  const removeWorkContract = (index) => {
    const updatedContracts = [...goodsContracts];
    updatedContracts.splice(index, 1);
    dispatch(removeWorksContract(updatedContracts));
  };

  const removeServiceContracts = (index) => {
    const updatedContracts = [...servicesContracts]; // Create a copy of the contracts array and remove the contract at the specified indexcontracts];
    updatedContracts.splice(index, 1);
    dispatch(removeServiceContract(updatedContracts));
  };
  //console.log("only contracts", contracts);
  return (
    <div className="">
      <div className="flex flex-col items-center mb-3 ">
        <div className="mb-3 flex flex-col justify-center flex-wrap">
          <label
            htmlFor="expenditureType"
            className="block mt-5 mb-2 text-sm font-bold text-[13.5px] text-gray-700"
          >
            Choose the Expenditure Type
          </label>
          <select
            name="fundingType"
            id="fundingType"
            value={expenditureType}
            onChange={(e) => dispatch(setExpenditureType(e.target.value))}
            className={`mt-2 block text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
          >
            <option value="">-----------------</option>
            <option value="Goods">Goods</option>
            <option value="Service">Service</option>
            <option value="Works">Works</option>
            <option value="Compensation">Compensation</option>
          </select>
        </div>
      </div>

      {expenditureType === "Goods" && (
        <div className="mt-6">
          <div className="flex flex-col items-center">
            <label htmlFor="availableContracts" className="font-semibold">
              Available Contracts ?
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="availableContractsYes"
                  name="availableContracts"
                  checked={availableContracts}
                  onChange={() => dispatch(toggleAvailableContracts())}
                  className="form-checkbox h-4 w-4"
                />
                <span className="ml-1 text-[13px]">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="checkbox"
                  id="availableContractsNo"
                  name="availableContracts"
                  checked={!availableContracts}
                  onChange={() => dispatch(toggleAvailableContracts())}
                  className="form-checkbox h-4 w-4"
                />
                <span className="ml-1 text-[13px]">No</span>
              </label>
            </div>
          </div>

          {availableContracts &&
            goodsContracts?.map((contract, index) => (
              //console.log("contract", contracts),
              <Fragment key={index}>
                <div className="flex justify-center mt-3 gap-4">
                  <div>
                    <label
                      htmlFor="contractDate"
                      className="text-[13.5px] text-gray-700"
                    >
                      Contract Date
                    </label>
                    <input
                      type="date"
                      id="contractDate"
                      name="contractDate"
                      value={contract.contractDate}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "contractDate",
                          e.target.value
                        );
                      }}
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>{" "}
                  <div>
                    <label
                      htmlFor="contractNo"
                      className="text-[13.5px] text-gray-700"
                    >
                      Contract No.
                    </label>
                    <input
                      type="text"
                      id="contractNo"
                      name="contractNo"
                      value={contract.contractNo}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "contractNo",
                          e.target.value
                        );
                      }}
                      placeholder="Contract No."
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="itemToBeSupplied"
                      className="text-[13.5px] text-gray-700"
                    >
                      Item to be Supplied
                    </label>
                    <input
                      type="text"
                      id="itemToBeSupplied"
                      name="itemToBeSupplied"
                      value={contract.itemToBeSupplied}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "itemToBeSupplied",
                          e.target.value
                        );
                      }}
                      placeholder="Item to be Supplied"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
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
                      name="quantity"
                      value={contract.quantity}
                      onChange={(e) => {
                        const formattedValue = formatNumber(e.target.value);
                        handleContractChange(index, "quantity", formattedValue);
                      }}
                      placeholder="Quantity"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="unitPrice"
                      className="text-[13.5px] text-gray-700"
                    >
                      Unit Price
                    </label>
                    <input
                      type="text"
                      id="unitPrice"
                      name="unitPrice"
                      value={contract.unitPrice}
                      onChange={(e) => {
                        const formattedValue = formatNumber(e.target.value);
                        handleContractChange(
                          index,
                          "unitPrice",
                          formattedValue
                        );
                      }}
                      placeholder="Unit Price"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="supplyBeforeDate"
                      className="text-[13.5px] text-gray-700"
                    >
                      Supply-before Date
                    </label>
                    <input
                      type="date"
                      id="supplyBeforeDate"
                      name="supplyBeforeDate"
                      value={contract.supplyBeforeDate}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "supplyBeforeDate",
                          e.target.value
                        );
                      }}
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="fileLabelNumber"
                      className="text-[13.5px] text-gray-700"
                    >
                      Who sign the contract ?
                    </label>
                    <input
                      type="text"
                      id="contractSign"
                      name="contractSign"
                      value={contract.contractSign}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "contractSign",
                          e.target.value
                        );
                      }}
                      placeholder="Who sign the contract ?"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="fileLabelNumber"
                      className="text-[13.5px] text-gray-700"
                    >
                      File Label No.
                    </label>
                    <input
                      type="text"
                      id="fileLabelNumber"
                      name="fileLabelNumber"
                      value={contract.fileLabelNumber}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "fileLabelNumber",
                          e.target.value
                        );
                      }}
                      placeholder="File Label No."
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <button
                    className="font-medium bg-green-700 px-[0.8rem] py-[0.15rem] mt-6"
                    onClick={addNewContract}
                  >
                    <span>+</span>
                  </button>
                  {index > 0 && (
                    <button
                      className="font-medium bg-red-700 px-[0.8rem] py-[0.15rem] mt-6 ml-2"
                      onClick={() => removeContract(index)}
                    >
                      <span>-</span>
                    </button>
                  )}
                </div>
              </Fragment>
            ))}
        </div>
      )}

      {expenditureType === "Service" && (
        <div className="mt-6">
          <div className="flex flex-col items-center">
            <label htmlFor="availableContracts" className="font-semibold">
              Available Contracts ?
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="availableContractsYes"
                  name="availableContracts"
                  checked={availableContracts}
                  onChange={() => dispatch(toggleAvailableContracts())}
                  className="form-checkbox h-4 w-4"
                />
                <span className="ml-1 text-[13px]">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="checkbox"
                  id="availableContractsNo"
                  name="availableContracts"
                  checked={!availableContracts}
                  onChange={() => dispatch(toggleAvailableContracts())}
                  className="form-checkbox h-4 w-4"
                />
                <span className="ml-1 text-[13px]">No</span>
              </label>
            </div>
          </div>

          {availableContracts &&
            //console.log("serviceContracts", servicesContracts),
            servicesContracts?.map((servicesContract, index) => (
              <Fragment key={index}>
                <div className="flex justify-center gap-4">
                  <div>
                    <label
                      htmlFor="contractDate"
                      className="text-[13.5px] text-gray-700"
                    >
                      Contract Date
                    </label>
                    <input
                      type="date"
                      id="contractDate"
                      name="contractDate"
                      value={servicesContract.contractDate}
                      onChange={(e) => {
                        handleServiceContractChange(
                          index,
                          "contractDate",
                          e.target.value
                        );
                      }}
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>{" "}
                  <div>
                    <label
                      htmlFor="contractNo"
                      className="text-[13.5px] text-gray-700"
                    >
                      Contract No.
                    </label>
                    <input
                      type="text"
                      id="contractNo"
                      name="contractNo"
                      value={servicesContract.contractNo}
                      onChange={(e) => {
                        handleServiceContractChange(
                          index,
                          "contractNo",
                          e.target.value
                        );
                      }}
                      placeholder="Contract No"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="serviceDescription"
                      className="text-[13.5px] text-gray-700"
                    >
                      Service Description
                    </label>
                    <input
                      type="text"
                      id="serviceDescription"
                      name="serviceDescription"
                      value={servicesContract.serviceDescription}
                      onChange={(e) => {
                        handleServiceContractChange(
                          index,
                          "serviceDescription",
                          e.target.value
                        );
                      }}
                      placeholder="Service Description"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="serviceToBeDeliveredBeforeDate"
                      className="text-[13.5px] text-gray-700"
                    >
                      Service to be delivered before date
                    </label>
                    <input
                      type="date"
                      id="serviceToBeDeliveredBeforeDate"
                      name="serviceToBeDeliveredBeforeDate"
                      value={servicesContract.serviceToBeDeliveredBeforeDate}
                      onChange={(e) => {
                        handleServiceContractChange(
                          index,
                          "serviceToBeDeliveredBeforeDate",
                          e.target.value
                        );
                      }}
                      placeholder="Date before service delivery"
                      className="appearance-none block w-[95%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contractSign"
                      className="text-[13.5px] text-gray-700"
                    >Who signed the contract ?
                    </label>
                    <input
                      type="text"
                      id="contractSign"
                      name="contractSign"
                      value={servicesContract.contractSign}
                      onChange={(e) => {
                        handleServiceContractChange(
                          index,
                          "contractSign",
                          e.target.value
                        );
                      }}
                      placeholder="Who signed the contract ?"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="fileLabelNumber"
                      className="text-[13.5px] text-gray-700"
                    >
                      File Label No.
                    </label>
                    <input
                      type="text"
                      id="fileLabelNumber"
                      name="fileLabelNumber"
                      value={servicesContract.fileLabelNumber}
                      onChange={(e) => {
                        handleServiceContractChange(
                          index,
                          "fileLabelNumber",
                          e.target.value
                        );
                      }}
                      placeholder="File Label No."
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <button
                    className="font-medium bg-green-700 px-[0.8rem] py-[0.15rem] mt-6"
                    onClick={addNewServiceContract}
                  >
                    <span>+</span>
                  </button>
                  {index > 0 && (
                    <button
                      className="font-medium bg-red-700 px-[0.8rem] py-[0.15rem] mt-6 ml-2"
                      onClick={() => removeServiceContracts(index)}
                    >
                      <span>-</span>
                    </button>
                  )}
                </div>
              </Fragment>
            ))}
        </div>
      )}

      {expenditureType === "Works" && (
        <div className="mb-3 ">
          <div className="flex flex-col items-center mb-4">
            <label
              htmlFor="workType"
              className="block  mb-2 text-sm font-bold text-[13.5px] text-gray-700"
            >
              Choose the Work Type ?
            </label>
            <select
              name="workType"
              id="workType"
              value={workType}
              onChange={(e) => dispatch(setWorkType(e.target.value))}
              className={`block  text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
            >
              <option value="default">-----------------</option>
              <option value="Road">Road</option>
              <option value="Bridge">Bridge</option>
              <option value="Structure Improvement">
                Structure Improvement
              </option>
              <option value="Building">Building</option>
              <option value="Pavements">Pavements</option>
            </select>
          </div>
          {workType === "Building" && (
            <div className="mt-6">
              {/* <div className="flex justify-center">
                <label
                  htmlFor="availableContracts"
                  className="font-semibold"
                ></label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      id="buildingType"
                      name="buildingType"
                      value="Story Building"
                      onChange={(e) =>
                        dispatch(setBuildingType(e.target.value))
                      }
                      className="form-checkbox h-4 w-4"
                    />
                    <span className="ml-1 text-[13px]">Story Building</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      id="buildingType"
                      name="buildingType"
                      value="Standard Building"
                      checked
                      onChange={(e) =>
                        dispatch(setBuildingType(e.target.value))
                      }
                      className="form-checkbox h-4 w-4"
                    />
                    <span className="ml-1 text-[13px]">Standard Building</span>
                  </label>
                </div>
              </div> */}
              <div className="flex flex-col items-center mt-3">
                <label
                  htmlFor="numberOfRooms"
                  className="text-[13.5px] text-gray-700 mb-2"
                >
                  Number Of Rooms
                </label>
                <input
                  type="text"
                  id="numberOfRooms"
                  name="numberOfRooms"
                  value={numberOfRooms}
                  onChange={(e) => {
                    const formattedValue = formatNumber(e.target.value);
                    dispatch(setNumberOfRooms(formattedValue));
                  }}
                  placeholder="Number of Rooms"
                  className="appearance-none block  text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
              </div>
              <div className="flex flex-col items-center mt-3">
                <label
                  htmlFor="description"
                  className="text-[13.5px] text-gray-700 mb-2"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    dispatch(setDescription(e.target.value));
                  }}
                  placeholder="Description"
                  className="appearance-none block  text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
              </div>
            </div>
          )}

          {workType === "Road" && workType === "Building" && (
            <div className="flex flex-col items-center mt-6">
              <label htmlFor="availableContracts" className="font-semibold">
                Available Contracts ?
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id="availableContractsYes"
                    name="availableContracts"
                    checked={availableContracts}
                    onChange={() => dispatch(toggleAvailableContracts())}
                    className="form-checkbox h-4 w-4"
                  />
                  <span className="ml-1 text-[13px]">Yes</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="checkbox"
                    id="availableContractsNo"
                    name="availableContracts"
                    checked={!availableContracts}
                    onChange={() => dispatch(toggleAvailableContracts())}
                    className="form-checkbox h-4 w-4"
                  />
                  <span className="ml-1 text-[13px]">No</span>
                </label>
              </div>
            </div>
          )}
          {expenditureType === "Works" && (
            <div className="flex flex-col items-center mt-6">
              <label htmlFor="availableContracts" className="font-semibold">
                Available Contracts ?
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id="availableContractsYes"
                    name="availableContracts"
                    checked={availableContracts}
                    onChange={() => dispatch(toggleAvailableContracts())}
                    className="form-checkbox h-4 w-4"
                  />
                  <span className="ml-1 text-[13px]">Yes</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="checkbox"
                    id="availableContractsNo"
                    name="availableContracts"
                    checked={!availableContracts}
                    onChange={() => dispatch(toggleAvailableContracts())}
                    className="form-checkbox h-4 w-4"
                  />
                  <span className="ml-1 text-[13px]">No</span>
                </label>
              </div>
            </div>
          )}

          {availableContracts &&
            expenditureType === "Works" &&
            (workType === "Structure Improvement" ||
              workType === "Bridge" ||
              workType === "Pavements") &&
            worksContracts?.map((worksContract, index) => (
              <Fragment key={index}>
                <div className="flex gap-4 justify-center">
                  <div>
                    <label
                      htmlFor="contractDate"
                      className="text-[13.5px] text-gray-700"
                    >
                      Contract Date
                    </label>
                    <input
                      type="date"
                      id="contractDate"
                      name="contractDate"
                      value={worksContract.contractDate}
                      onChange={(e) => {
                        handleWorkContractChange(
                          index,
                          "contractDate",
                          e.target.value
                        );
                      }}
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>{" "}
                  <div>
                    <label
                      htmlFor="contractNo"
                      className="text-[13.5px] text-gray-700"
                    >
                      Contract No.
                    </label>
                    <input
                      type="text"
                      id="contractNo"
                      name="contractNo"
                      value={worksContract.contractNo}
                      onChange={(e) => {
                        handleWorkContractChange(
                          index,
                          "contractNo",
                          e.target.value
                        );
                      }}
                      placeholder="Contract No"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="serviceDescription"
                      className="text-[13.5px] text-gray-700"
                    >
                      Work Description
                    </label>
                    <input
                      type="text"
                      id="workDescription"
                      name="workDescription"
                      value={worksContract.workDescription}
                      onChange={(e) => {
                        handleWorkContractChange(
                          index,
                          "workDescription",
                          e.target.value
                        );
                      }}
                      placeholder="Work Description"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="workToBeFinishedBeforeDate"
                      className="text-[13.5px] text-gray-700"
                    >
                      Work to be delivered before date
                    </label>
                    <input
                      type="date"
                      id="workToBeDeliveredBeforeDate"
                      name="workToBeDeliveredBeforeDate"
                      value={worksContract.workToBeDeliveredBeforeDate}
                      onChange={(e) => {
                        handleWorkContractChange(
                          index,
                          "workToBeDeliveredBeforeDate",
                          e.target.value
                        );
                      }}
                      placeholder="Work end date"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="workToBeFinishedBeforeDate"
                      className="text-[13.5px] text-gray-700"
                    >
                      Who sign the contract ?
                    </label>
                    <input
                      type="text"
                      id="contractSign"
                      name="contractSign"
                      value={worksContract.contractSign}
                      onChange={(e) => {
                        handleWorkContractChange(
                          index,
                          "contractSign",
                          e.target.value
                        );
                      }}
                      placeholder="Who sign the contract"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="fileLabelNumber"
                      className="text-[13.5px] text-gray-700"
                    >
                      File Label No.
                    </label>
                    <input
                      type="text"
                      id="fileLabelNumber"
                      name="fileLabelNumber"
                      value={worksContract.fileLabelNumber}
                      onChange={(e) => {
                        handleWorkContractChange(
                          index,
                          "fileLabelNumber",
                          e.target.value
                        );
                      }}
                      placeholder="File Label No."
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <button
                    className="font-medium bg-green-700 px-[0.8rem] py-[0.15rem] mt-6"
                    onClick={addNewWorkContract}
                  >
                    <span>+</span>
                  </button>
                  {index > 0 && (
                    <button
                      className="font-medium bg-red-700 px-[0.8rem] py-[0.15rem] mt-6 ml-2"
                      onClick={() => removeWorkContract(index)}
                    >
                      <span>-</span>
                    </button>
                  )}
                </div>
              </Fragment>
            ))}

          {availableContracts &&
            expenditureType === "Works" &&
            (workType === "Road" || workType === "Building") &&
            roadsContracts?.map((roadContract, index) => (
              <Fragment key={index}>
                <div className="flex justify-center mt-1">
                  <div>
                    <label
                      htmlFor="contractDate"
                      className="text-[13.5px] text-gray-700"
                    >
                      Contract Date
                    </label>
                    <input
                      type="date"
                      id="contractDate"
                      name="contractDate"
                      value={roadContract.contractDate}
                      onChange={(e) => {
                        handleRoadContractChange(
                          index,
                          "contractDate",
                          e.target.value
                        );
                      }}
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>{" "}
                  <div>
                    <label
                      htmlFor="contractNo"
                      className="text-[13.5px] text-gray-700"
                    >
                      Contract No.
                    </label>
                    <input
                      type="text"
                      id="contractNo"
                      name="contractNo"
                      value={roadContract.contractNo}
                      onChange={(e) => {
                        handleRoadContractChange(
                          index,
                          "contractNo",
                          e.target.value
                        );
                      }}
                      placeholder="Contract No"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contractNo"
                      className="text-[13.5px] text-gray-700"
                    >
                      Who Signed ?
                    </label>
                    <input
                      type="text"
                      id="contractSign"
                      name="contractSign"
                      value={roadContract.contractSign}
                      onChange={(e) => {
                        handleRoadContractChange(
                          index,
                          "contractSign",
                          e.target.value
                        );
                      }}
                      placeholder="Who Signed ?"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  {workType != "Building" && (
                    <div>
                      <label
                        htmlFor="serviceDescription"
                        className="text-[13.5px] text-gray-700"
                      >
                        Total Kilometers
                      </label>
                      <input
                        type="text"
                        id="totalKilometers"
                        name="totalKilometers"
                        value={roadContract.totalKilometers}
                        onChange={(e) => {
                          handleRoadContractChange(
                            index,
                            "totalKilometers",
                            e.target.value
                          );
                        }}
                        placeholder="Total Kilometers"
                        className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="contractNo"
                      className="text-[13.5px] text-gray-700"
                    >
                      File Label Number
                    </label>
                    <input
                      type="text"
                      id="fileLabelNumber"
                      name="fileLabelNumber"
                      value={roadContract.fileLabelNumber}
                      onChange={(e) => {
                        handleRoadContractChange(
                          index,
                          "fileLabelNumber",
                          e.target.value
                        );
                      }}
                      placeholder="File Label Number"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>

                </div>
              </Fragment>
            ))}
        </div>
      )}

      {expenditureType === "Compensation" && (
        <div className="mt-6">
          <div className="mb-3 ">
            <div className="flex justify-center items-center">
              <div className="mb-3 flex flex-col justify-center flex-wrap">
                <label
                  htmlFor="compensationType"
                  className="block mt-5 mb-2 text-sm font-bold text-[13.5px] text-gray-700"
                >
                  Choose the Compensation Type
                </label>
                <select
                  name="compensationType"
                  id="compensationType"
                  value={compensationType}
                  onChange={(e) =>
                    dispatch(setCompensationType(e.target.value))
                  }
                  className={`mt-3 block text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
                >
                  <option value="">-----------------</option>
                  <option value="judgementDebt">Judgement Debt</option>
                  <option value="landCompensation">Land Compensation</option>
                </select>
              </div>
            </div>

            {/* {compensationType === "staffAlowance" && (
              <div className="">
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="fileLabelNumber"
                    className="text-[13.5px] text-gray-700 mb-2"
                  >
                    Allowance Name
                  </label>
                  <input
                    type="text"
                    id="allowanceName"
                    name="allowanceName"
                    value={allowanceName}
                    onChange={(e) => {
                      dispatch(setAllowanceName(e.target.value));
                    }}
                    className="appearance-none block text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    placeholder="Allowance Name"
                  />
                </div>
              </div>
            )} */}
          </div>
          {compensationType === "judgementDebt" && (
            <div>
              <div className="flex flex-col items-center">
                <label htmlFor="availableContracts" className="font-semibold mt-2">
                  Available Judgement ?
                </label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      id="availableJudgementYes"
                      name="availableJudgement"
                      checked={availableJudgement}
                      onChange={() => dispatch(toggleAvailableJudgement())}
                      className="form-checkbox h-4 w-4"
                    />
                    <span className="ml-1 text-[13px]">Yes</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="checkbox"
                      id="availableJudgementNo"
                      name="availableJudgement"
                      checked={!availableJudgement}
                      onChange={() => dispatch(toggleAvailableJudgement())}
                      className="form-checkbox h-4 w-4"
                    />
                    <span className="ml-1 text-[13px]">No</span>
                  </label>
                </div>
              </div>
              {availableJudgement &&
                judgements?.map((judgement, index) => (
                  <Fragment key={index}>
                    <div className="flex justify-center">
                      <div>
                        <label
                          htmlFor="judgementDate"
                          className="text-[13.5px] text-gray-700"
                        >
                          Judgement Date
                        </label>
                        <input
                          type="date"
                          id="judgementDate"
                          name="judgementDate"
                          value={judgement.judgementDate}
                          onChange={(e) => {
                            handleJudgementChange(
                              index,
                              "judgementDate",
                              e.target.value
                            );
                          }}
                          className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                        />
                      </div>
                      <div className=" flex flex-row">
                        <div>
                          <label
                            htmlFor="awardedJudgementAmount"
                            className="text-[13.5px] text-gray-700"
                          >
                            Awarded Judgement Amount
                          </label>
                          <input
                            type="text"
                            id="awardedJudgementAmount"
                            name="awardedJudgementAmount"
                            value={judgement.awardedJudgementAmount}
                            onChange={(e) => {

                              const formattedValue = formatNumber(e.target.value);

                              handleJudgementChange(
                                index,
                                "awardedJudgementAmount",
                                formattedValue
                              );
                            }}
                            className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                            placeholder="Awarded Judgement Amount"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div>
                          <label
                            htmlFor="fileLabelNumber"
                            className="text-[13.5px] text-gray-700"
                          >
                            File Label Number
                          </label>
                          <input
                            type="text"
                            id="fileLabelNumber"
                            name="fileLabelNumber"
                            value={judgement.fileLabelNumber}
                            onChange={(e) => {
                              handleJudgementChange(
                                index,
                                "fileLabelNumber",
                                e.target.value
                              );
                            }}
                            className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                            placeholder="File Label Number"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div>
                          <label
                            htmlFor="beneficiary"
                            className="text-[13.5px] text-gray-700"
                          >
                            Beneficiary
                          </label>
                          <input
                            type="text"
                            id="beneficiary"
                            name="beneficiary"
                            value={judgement.beneficiary}
                            onChange={(e) => {
                              handleJudgementChange(
                                index,
                                "beneficiary",
                                e.target.value
                              );
                            }}
                            className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                            placeholder="Beneficiary"
                          />
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))
              }
            </div>

          )}



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
            {(expenditureType == "Works" && (workType != "Road" && workType != "Bridge")) && (
              <button
                onClick={() => {
                  if (workType == "default") {
                    return;
                  }
                  if (workType == "Building") {
                    if (availableContracts) {
                      const contractDetailsAreMissing = roadsContracts.some(
                        (contract) =>
                          !contract.contractDate || !contract.contractNo || !contract.contractSign || !contract.fileLabelNumber
                      );
                      if (contractDetailsAreMissing) {
                        return;
                      }
                    }
                  }

                  if (workType == "Structure Improvement" || workType == "Pavements") {
                    if (availableContracts) {
                      const contractDetailsAreMissing = worksContracts.some(
                        (contract) =>
                          !contract.contractDate || !contract.contractNo || !contract.workDescription || !contract.workToBeDeliveredBeforeDate || !contract.contractSign || !contract.fileLabelNumber
                      );
                      if (contractDetailsAreMissing) {
                        return;
                      }
                    }
                  }
                  navigate(`/dashboard/transactiondetails/${id}/4`)
                }
                }
                className="bg-blue-500 text-white px-4 py-2 border-full rounded"
              >
                Next
              </button>
            )}
            {expenditureType == "Works" && (workType == "Road" || workType == "Bridge") && (
              <button
                onClick={() => {
                  if (workType == "default") {
                    return;
                  }
                  if (workType == "Road") {
                    if (availableContracts) {
                      const contractDetailsAreMissing = roadsContracts.some(
                        (contract) =>
                          !contract.contractDate || !contract.contractNo || !contract.contractSign || !contract.fileLabelNumber || !contract.totalKilometers
                      );
                      if (contractDetailsAreMissing) {
                        return;
                      }
                    }
                  }
                  if (workType == "Bridge") {
                    if (availableContracts) {
                      const contractDetailsAreMissing = worksContracts.some(
                        (contract) =>
                          !contract.contractDate || !contract.contractNo || !contract.workDescription || !contract.workToBeDeliveredBeforeDate || !contract.contractSign || !contract.fileLabelNumber
                      );
                      if (contractDetailsAreMissing) {
                        return;
                      }
                    }
                  }
                  navigate(`/dashboard/transactiondetails/${id}/8`)
                }}
                className="bg-blue-500 text-white px-4 py-2 border-full rounded"
              >
                Next
              </button>
            )}
            {expenditureType == "Goods" && (

              <button
                onClick={() => {
                  if (availableContracts) {
                    const contractDetailsAreMissing = goodsContracts.some(
                      (contract) =>
                        !contract.contractDate || !contract.contractNo || !contract.itemToBeSupplied || !contract.quantity || !contract.unitPrice || !contract.supplyBeforeDate || !contract.contractSign || !contract.fileLabelNumber
                    );
                    if (contractDetailsAreMissing) {
                      return;
                    }

                  }
                  navigate(`/dashboard/transactiondetails/${id}/4`)
                }
                }
                className="bg-blue-500 text-white px-4 py-2 border-full rounded"
              >
                Next
              </button>

            )}

            {expenditureType == "Service" && (

              <button
                onClick={() => {
                  if (availableContracts) {
                    const contractDetailsAreMissing = servicesContracts.some(
                      (contract) =>
                        !contract.contractDate || !contract.contractNo || !contract.serviceDescription || !contract.serviceToBeDeliveredBeforeDate || !contract.contractSign || !contract.fileLabelNumber
                    );
                    if (contractDetailsAreMissing) {
                      return;
                    }
                  }
                  navigate(`/dashboard/transactiondetails/${id}/4`)
                }}
                className="bg-blue-500 text-white px-4 py-2 border-full rounded"
              >
                Next
              </button>

            )}
          </div>
        )}

        {currentPath.startsWith("/dashboard/edittransaction") && (
          <div>
            {(expenditureType == "Works" && (workType != "Road" && workType != "Bridge")) && (
              <button
                onClick={() => {
                  if (workType == "default") {
                    return;
                  }
                  if (workType == "Building") {
                    if (availableContracts) {
                      const contractDetailsAreMissing = roadsContracts.some(
                        (contract) =>
                          !contract.contractDate || !contract.contractNo || !contract.contractSign || !contract.fileLabelNumber
                      );
                      if (contractDetailsAreMissing) {
                        return;
                      }
                    }
                  }
                  if (workType == "Structure Improvement" || workType == "Pavements") {
                    if (availableContracts) {
                      const contractDetailsAreMissing = worksContracts.some(
                        (contract) =>
                          !contract.contractDate || !contract.contractNo || !contract.workDescription || !contract.workToBeDeliveredBeforeDate || !contract.contractSign || !contract.fileLabelNumber
                      );
                      if (contractDetailsAreMissing) {
                        return;
                      }
                    }
                  }
                  navigate(`/dashboard/edittransaction/${id}/4`)
                }}
                className="bg-blue-500 text-white px-4 py-2 border-full rounded"
              >
                Next
              </button>
            )}
            {expenditureType == "Works" && (workType == "Road" || workType == "Bridge") && (
              <button
                onClick={() => {
                  if (workType == "default") {
                    return;
                  }
                  if (workType == "Road") {
                    if (availableContracts) {
                      const contractDetailsAreMissing = roadsContracts.some(
                        (contract) =>
                          !contract.contractDate || !contract.contractNo || !contract.contractSign || !contract.fileLabelNumber || !contract.totalKilometers
                      );
                      if (contractDetailsAreMissing) {
                        return;
                      }
                    }
                  }
                  if (workType == "Bridge") {
                    if (availableContracts) {
                      const contractDetailsAreMissing = worksContracts.some(
                        (contract) =>
                          !contract.contractDate || !contract.contractNo || !contract.workDescription || !contract.workToBeDeliveredBeforeDate || !contract.contractSign || !contract.fileLabelNumber
                      );
                      if (contractDetailsAreMissing) {
                        return;
                      }
                    }
                  }
                  navigate(`/dashboard/edittransaction/${id}/8`)}}
                className="bg-blue-500 text-white px-4 py-2 border-full rounded"
              >
                Next
              </button>
            )}
            {expenditureType == "Goods" && (

              <button
                onClick={() => {
                  if (availableContracts) {
                    const contractDetailsAreMissing = goodsContracts.some(
                      (contract) =>
                        !contract.contractDate || !contract.contractNo || !contract.itemToBeSupplied || !contract.quantity || !contract.unitPrice || !contract.supplyBeforeDate || !contract.contractSign || !contract.fileLabelNumber
                    );
                    if (contractDetailsAreMissing) {
                      return;
                    }

                  }
                  navigate(`/dashboard/edittransaction/${id}/4`)
                }
                }
                className="bg-blue-500 text-white px-4 py-2 border-full rounded"
              >
                Next
              </button>

            )}

            {expenditureType == "Service" && (

              <button
                onClick={() => {
                  if (availableContracts) {
                    const contractDetailsAreMissing = servicesContracts.some(
                      (contract) =>
                        !contract.contractDate || !contract.contractNo || !contract.serviceDescription || !contract.serviceToBeDeliveredBeforeDate || !contract.contractSign || !contract.fileLabelNumber
                    );
                    if (contractDetailsAreMissing) {
                      return;
                    }
                  }
                  navigate(`/dashboard/edittransaction/${id}/4`)
                }}
                className="bg-blue-500 text-white px-4 py-2 border-full rounded"
              >
                Next
              </button>

            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Form4;
