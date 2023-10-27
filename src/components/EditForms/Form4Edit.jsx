import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setExpenditureType,
  toggleAvailableContracts,
  addContract,
  updateContract,
  removeContracts,
} from "../../redux/editfeatures/form4EditSlice.js";

const Form4Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const expenditureType = useSelector((state) => state.form4Edit.expendituretype);
  const availableContracts = useSelector(
    (state) => state.form4Edit.availablecontracts
  );
  const contracts = useSelector((state) => state.form4Edit.contracts);
  const unitprice = useSelector((state) => state.form4Edit.unitprice);
  const contractnumber = useSelector((state) => state.form4Edit.contractnumber);

  const addNewContract = () => {
    dispatch(addContract());
  }

  const handleContractChange = (index, fieldName, value) => {
    //console.log("dans contrat change", index, fieldName, value);
    dispatch(updateContract({ index, fieldName, value }));
  }

  const removeContract = (index) => {
    const updatedContracts = [...contracts];
    updatedContracts.splice(index, 1);
    dispatch(removeContracts(updatedContracts));
  }
  //console.log("only contracts", contracts);
  return (
    <div className="ml-[40%]">
      <div className="mb-3 ">
        <label
          htmlFor="expenditureType"
          className="block mt-5 mb-2 text-sm font-bold text-[13.5px] text-gray-700"
        >
          What is the Expenditure Type ?
        </label>
        <select
          name="fundingType"
          id="fundingType"
          value={expenditureType}
          onChange={(e) => dispatch(setExpenditureType(e.target.value))}
          className={`block w-1/4 text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
        >
          <option value="">-----------------</option>
          <option value="Goods">Goods</option>
          <option value="Service">Service</option>
          <option value="Works">Works</option>
          <option value="Compensation">Compensation</option>
        </select>
      </div>

      {expenditureType === "Goods" && (
        <div className="ml-[6%] mt-6">
          <label htmlFor="availableContracts" className="font-semibold">Available Contracts ?</label>
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

          {availableContracts && (
            contracts.map((contract, index) => (
              //console.log("contract", contracts),
              <Fragment key={index} >
                <div className="-ml-[58%] flex flex-row">
                  <div>
                    <label
                      htmlFor="contractdate"
                      className="text-[13.5px] text-gray-700"
                    >
                      Contract Date
                    </label>
                    <input
                      type="date"
                      id="contractdate"
                      name="contractdate"
                      value={contract.contractdate}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "contractdate",
                          e.target.value
                        )
                      }}
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>{" "}
                  <div>
                    <label
                      htmlFor="contractnumber"
                      className="text-[13.5px] text-gray-700"
                    >
                      Contract No.
                    </label>
                    <input
                      type="text"
                      id="contractnumber"
                      name="contractnumber"
                      value={contract.contractnumber}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "contractnumber",
                          e.target.value
                        )
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
                      id="itemtobesupplied"
                      name="itemtobesupplied"
                      value={contract.itemtobesupplied}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "itemtobesupplied",
                          e.target.value
                        )
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
                        handleContractChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }}
                      placeholder="Quantity"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="unitprice"
                      className="text-[13.5px] text-gray-700"
                    >
                      Unit Price
                    </label>
                    <input
                      type="text"
                      id="unitprice"
                      name="unitprice"
                      value={contract.unitprice}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "unitprice",
                          e.target.value
                        )
                      }}
                      placeholder="Unit Price"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="supplybeforedate"
                      className="text-[13.5px] text-gray-700"
                    >
                      Supply-before Date
                    </label>
                    <input
                      type="date"
                      id="supplybeforedate"
                      name="supplybeforedate"
                      value={contract.supplybeforedate}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "supplybeforedate",
                          e.target.value
                        )
                      }}
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="filelabelnumber"
                      className="text-[13.5px] text-gray-700"
                    >
                      File Label No.
                    </label>
                    <input
                      type="text"
                      id="filelabelnumber"
                      name="filelabelnumber"
                      value={contract.filelabelnumber}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "filelabelnumber",
                          e.target.value
                        )
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
            ))

          )}
        </div>
      )}

      {expenditureType === "Service" && (
        <div className="ml-[6%] mt-6">
          <label htmlFor="availableContracts" className="font-semibold">Available Contracts ?</label>
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

          {availableContracts && (
            console.log("contracts", contracts),
            contracts.map((contract, index) => (
              <Fragment key={index} >
                <div className="-ml-[58%] flex flex-row">

                  <div>
                    <label
                      htmlFor="contractdate"
                      className="text-[13.5px] text-gray-700"
                    >
                      Contract Date
                    </label>
                    <input
                      type="date"
                      id="contractdate"
                      name="contractdate"
                      value={contract.contractdate}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "contractdate",
                          e.target.value
                        )
                      }}
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>{" "}
                  <div>
                    <label
                      htmlFor="contractnumber"
                      className="text-[13.5px] text-gray-700"
                    >
                      Contract No.
                    </label>
                    <input
                      type="text"
                      id="contractnumber"
                      name="contractnumber"
                      value={contract.contractnumber}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "contractnumber",
                          e.target.value
                        )
                      }}
                      placeholder="Contract No"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="itemtobesupplied"
                      className="text-[13.5px] text-gray-700"
                    >
                      Item to be Supplied
                    </label>
                    <input
                      type="text"
                      id="itemtobesupplied"
                      name="itemtobesupplied"
                      value={contract.itemtobesupplied}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "itemtobesupplied",
                          e.target.value
                        )
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
                        handleContractChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }}
                      placeholder="Quantity"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="unitprice"
                      className="text-[13.5px] text-gray-700"
                    >
                      Unit Price
                    </label>
                    <input
                      type="text"
                      id="unitprice"
                      name="unitprice"
                      value={contract.unitprice}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "unitprice",
                          e.target.value
                        )
                      }}
                      placeholder="Unit Price"
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="supplybeforedate"
                      className="text-[13.5px] text-gray-700"
                    >
                      Supply-before Date
                    </label>
                    <input
                      type="date"
                      id="supplybeforedate"
                      name="supplybeforedate"
                      value={contract.supplybeforedate}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "supplybeforedate",
                          e.target.value
                        )
                      }}
                      className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="filelabelnumber"
                      className="text-[13.5px] text-gray-700"
                    >
                      File Label No.
                    </label>
                    <input
                      type="text"
                      id="filelabelnumber"
                      name="filelabelnumber"
                      value={contract.filelabelnumber}
                      onChange={(e) => {
                        handleContractChange(
                          index,
                          "filelabelnumber",
                          e.target.value
                        )
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
            ))

          )}
        </div>
      )}

      <div className="flex space-x-2 ml-[6%] mt-[2%]">
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-4 py-2 border-full rounded"
        >
          Back
        </button>
        <button
          onClick={() => navigate(`/dashboard/edittransaction/${id}/4`)}
          className="bg-blue-500 text-white px-4 py-2 border-full rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Form4Edit;
