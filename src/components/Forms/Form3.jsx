import React, { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setFundingType,
  toggleWarrantSupported,
  toggleAvailableBudget,
  setWarrantDate,
  setWarrantNo,
  setFileLabelNumber,
  setWarrantAmount,
  setFinancialYear,
  setBudgetFileLabelNumber,
  updateDonor,
  setStatutoryFund,
} from "../../redux/features/Form3Slice";
import { DetailsModal } from "../../utils/DetailsModal";
import { formatNumber } from "../../functions/helperFunctions";

const Form3 = () => {
  const { id } = useParams();
  const currentPath = window.location.pathname;
  console.log("Chemin actuel : " + currentPath)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fundingType = useSelector((state) => state.form3.fundingType);
  const financialYear = useSelector((state) => state.form3.financialYear);
  const warrantSupported = useSelector((state) => state.form3.warrantSupported);
  const warrantDate = useSelector((state) => state.form3.warrantDate);
  const warrantNo = useSelector((state) => state.form3.warrantNo);
  const warrantAmount = useSelector((state) => state.form3.warrantAmount);
  const fileLabelNumber = useSelector((state) => state.form3.fileLabelNumber);
  const availableBudget = useSelector((state) => state.form3.availableBudget);
  const [isModalOpen, setModalOpen] = useState(false);
  const budgetFileLabelNumber = useSelector(
    (state) => state.form3.budgetFileLabelNumber
  );
  const donors = useSelector((state) => state.form3.donors);
  const statutoryFund = useSelector((state) => state.form3.statutoryFund);
  const handleFundingTypeChange = (e) => {
    console.log("dans fund change", e.target.value);
    dispatch(setFundingType(e.target.value));
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleFinancialYearChange = (e) => {
    dispatch(setFinancialYear(e.target.value));
  };

  const handleDonorChange = (index, fieldName, value) => {
    dispatch(updateDonor({ index, fieldName, value }));
  };

  //console.log(warrantSupported);

  const handleWarrantAmountInputChange = (e) => {
    const formattedValue = formatNumber(e.target.value);
    dispatch(setWarrantAmount(formattedValue));
  };
 console.log("le log", fundingType)
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center mb-3">
          <label
            htmlFor="fundingType"
            className="block mt-5 mb-2  text-[13.5px] text-gray-700 font-semibold"
          >
            Choose the Funding Type
          </label>
          <select
            name="fundingType"
            id="fundingType"
            value={fundingType}
            onChange={handleFundingTypeChange}
            className={`block text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
          >
            <option value="default">---</option>
            <option value="Central government">Central Government</option>
            <option value="IGF">IGF</option>
            <option value="Donor">Donor</option>
            {/* <option value="Statutory">Statutory</option> */}
          </select>
        </div>
      </div>

      {fundingType === "Central government" && (
        <div className="flex flex-col items-center">
          <label htmlFor="warrantSupported" className="font-semibold mt-4">
            Is it supported with warrant ?
          </label>
          <div className="mt-2">
            <label className="inline-flex items-center ">
              <input
                type="checkbox"
                id="warrantSupportedYes"
                name="warrantSupported"
                checked={warrantSupported}
                onChange={() => dispatch(toggleWarrantSupported())}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-1 text-[13px]">Yes</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                id="warrantSupportedNo"
                name="warrantSupported"
                checked={!warrantSupported}
                onChange={() => dispatch(toggleWarrantSupported())}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-1 text-[13px]">No</span>
            </label>
          </div>

          {warrantSupported && (
            <div className=" space-y-3">
              <div className="mt-3">
                <label
                  htmlFor="paymentDate"
                  className="text-[13.5px] text-gray-700"
                >
                  Warrant Date
                </label>
                <input
                  type="date"
                  id="warrantDate"
                  value={warrantDate}
                  onChange={(e) => dispatch(setWarrantDate(e.target.value))}
                  className="appearance-none w-full block text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
              </div>{" "}
              <div>
                <label htmlFor="pvNo" className="text-[13.5px] text-gray-700">
                  Warrant No.
                </label>
                <input
                  type="text"
                  id="warrantNo."
                  value={warrantNo}
                  onChange={(e) => dispatch(setWarrantNo(e.target.value))}
                  placeholder="Warrant No."
                  className="appearance-none block text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
              </div>
              <div>
                <label htmlFor="pvNo" className="text-[13.5px] text-gray-700">
                  Warrant Amount
                </label>
                <input
                  type="text"
                  id="warrantAmount"
                  value={warrantAmount}
                  onInput={handleWarrantAmountInputChange}
                  placeholder="Warrant Amount."
                  className="appearance-none block text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
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
                  value={fileLabelNumber}
                  onChange={(e) => dispatch(setFileLabelNumber(e.target.value))}
                  placeholder="File Label No."
                  className="appearance-none block text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {fundingType === "IGF" && (
        <div className="flex flex-col items-center">
          <label htmlFor="availableBudget" className="font-semibold mt-4">
            Available Budget ?
          </label>
          <div className="mt-2">
            <label className="inline-flex items-center ">
              <input
                type="checkbox"
                id="availableBudgetYes"
                name="availableBudgetNo"
                checked={availableBudget}
                onChange={() => dispatch(toggleAvailableBudget())}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-1 text-[13px]">Yes</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                id="availableBudgetNo"
                name="availableBudget"
                checked={!availableBudget}
                onChange={() => dispatch(toggleAvailableBudget())}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-1 text-[13px]">No</span>
            </label>
          </div>
          {availableBudget && (
            <div className="mb-3">
              <label
                htmlFor="financialYear"
                className="block mt-5 mb-2 text-[13.5px] text-gray-700 font-semibold"
              >
                Choose the financial year
              </label>
              <select
                name="financialYear"
                id="financialYear"
                value={financialYear}
                onChange={handleFinancialYearChange}
                className={`block w-full text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
              >
                <option value="">---</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
              </select>

              <div className="mt-3">
                <label
                  htmlFor="budgetFileLabelNumber"
                  className="block mt-5 mb-2 text-[13.5px] text-gray-700 font-semibold"
                >
                  Budget File Label Number
                </label>
                <input
                  type="text"
                  id="budgetFileLabelNumber"
                  value={budgetFileLabelNumber}
                  onChange={(e) =>
                    dispatch(setBudgetFileLabelNumber(e.target.value))
                  }
                  placeholder="File Label No"
                  className="appearance-none block text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {fundingType === "Donor" && (
        <div className="flex flex-col item-center">
          <div className="flex justify-center mt-3">
            {donors?.map((donor, index) => (
              <Fragment key={index}>
                <div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <label
                        htmlFor="donorName"
                        className="text-[13.5px] text-gray-700"
                      >
                        Donor Name
                      </label>
                      <input
                        type="text"
                        id="donorName"
                        value={donor.donorName}
                        onChange={(e) =>
                          handleDonorChange(index, "donorName", e.target.value)
                        }
                        placeholder="Donor Name"
                        className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pledgeAmount"
                        className="text-[13.5px] text-gray-700"
                      >
                        Pledge Amount.
                      </label>
                      <input
                        type="text"
                        id="pledgeAmount"
                        value={donor.pledgeAmount}
                        onChange={(e) => {
                          const formattedValue = formatNumber(e.target.value);
                          handleDonorChange(
                            index,
                            "pledgeAmount",
                            formattedValue
                          )
                        }
                          
                        }
                        placeholder="Pledge Amount."
                        className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                      />
                    </div>
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
                        value={donor.fileLabelNumber}
                        onChange={(e) =>
                          handleDonorChange(
                            index,
                            "fileLabelNumber",
                            e.target.value
                          )
                        }
                        placeholder="File Label Number"
                        className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                      />
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          <div className="flex flex-col items-center mt-3">
            <label
              htmlFor="availableBudget"
              className="font-semibold mb-2 mt-4"
            >
              Available Budget ?
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center ">
                <input
                  type="checkbox"
                  id="availableBudgetYes"
                  name="availableBudgetNo"
                  checked={availableBudget}
                  onChange={() => dispatch(toggleAvailableBudget())}
                  className="form-checkbox h-4 w-4"
                />
                <span className="ml-1 text-[13px]">Yes</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="checkbox"
                  id="availableBudgetNo"
                  name="availableBudget"
                  checked={!availableBudget}
                  onChange={() => dispatch(toggleAvailableBudget())}
                  className="form-checkbox h-4 w-4"
                />
                <span className="ml-1 text-[13px]">No</span>
              </label>
            </div>
          </div>

          {availableBudget && (
            <div className="mb-3">
              <div className="flex flex-col items-center">
                <label
                  htmlFor="financialYear"
                  className="block mt-5 mb-2 text-[13.5px] text-gray-700"
                >
                  Choose the financial year
                </label>
                <select
                  name="financialYear"
                  id="financialYear"
                  value={financialYear}
                  onChange={handleFinancialYearChange}
                  className={`block w-[12.2%] text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
                >
                  <option value="">---</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                </select>
              </div>

              <div className="flex flex-col items-center mt-3">
                <label
                  htmlFor="budgetFileLabelNumber"
                  className="text-[13.5px] text-gray-700 mb-2"
                >
                  Budget File Label Number
                </label>
                <input
                  type="text"
                  id="budgetFileLabelNumber"
                  value={budgetFileLabelNumber}
                  onChange={(e) =>
                    dispatch(setBudgetFileLabelNumber(e.target.value))
                  }
                  placeholder="File Label No."
                  className="appearance-none block text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
              </div>
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
           <button
          onClick={() => {
            if (fundingType == "") {
              return;
            }
            if (fundingType == "Central government" && warrantSupported && (!warrantNo || !warrantDate || !warrantAmount || !fileLabelNumber)) {
              return;
            }
            navigate(`/dashboard/transactiondetails/${id}/10`)
          }}
          className={`bg-blue-500 text-white px-4 py-2 border-full rounded ${
            fundingType === "IGF" || fundingType === "Statutory"|| fundingType === "Donor"
              ? "bg-green-800/50"
              : ""
          }`}
          disabled={fundingType === "IGF" || fundingType === "Statutory"|| fundingType === "Donor"}
        >
          Next
        </button>
        )}
        {currentPath.startsWith("/dashboard/edittransaction") && (
           <button
           onClick={() => {
            if (fundingType == "") {
              return;
            }
            if (fundingType == "Central government" && warrantSupported && (!warrantNo || !warrantDate || !warrantAmount || !fileLabelNumber)) {
              return;
            }
            navigate(`/dashboard/edittransaction/${id}/10`)
          }}
          className={`bg-blue-500 text-white px-4 py-2 border-full rounded ${
            fundingType === "IGF" || fundingType === "Statutory"|| fundingType === "Donor"
              ? "bg-green-800/50"
              : ""
          }`}
          disabled={fundingType === "IGF" || fundingType === "Statutory"|| fundingType === "Donor"}
        >
          Next
        </button>
        )}
       
      </div>
    </div>
  );
};

export default Form3;
