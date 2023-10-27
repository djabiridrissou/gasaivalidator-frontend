import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setFundingType,
  toggleWarrantSupported,
  setWarrantDate,
  setWarrantNo,
  setFileLabelNumber,
  setWarrantAmount,
} from "../../redux/editfeatures/Form3EditSlice";

const Form3Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fundingType = useSelector((state) => state.form3Edit.fundingtype);
  const warrantSupported = useSelector((state) => state.form3Edit.warrantsupported);
  const warrantDate = useSelector((state) => state.form3Edit.warrantdate);
  const warrantNo = useSelector((state) => state.form3Edit.warrantno);
  const warrantAmount = useSelector((state) => state.form3Edit.warrantamount);
  const fileLabelNumber = useSelector((state) => state.form3Edit.filelabelnumber);

  const handleFundingTypeChange = (e) => {
    dispatch(setFundingType(e.target.value));
  };



  return (
    <div className="ml-[40%]">
      <div>
        <div className="mb-3">
          <label
            htmlFor="fundingType"
            className="block mt-5 mb-2 text-sm ml-[8%] text-[13.5px] text-gray-700 font-semibold"
          >
            Choose the Funding Type
          </label>
          <select
            name="fundingType"
            id="fundingType"
            value={fundingType}
            onChange={handleFundingTypeChange}
            className={`block w-1/4 text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
          >
            <option value="">---</option>
            <option value="Central government">Central Government</option>
            <option value="IGF">IGF</option>
            <option value="Donor">Donor</option>
            <option value="Statutory">Statutory</option>
          </select>
        </div>
      </div>

      {fundingType === "Central government" && (
        <div className="ml-[8%]">
          <label htmlFor="warrantSupported" className="font-semibold -ml-14 mt-4">Is it supported with warrant ?</label>
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
            <div className="-ml-[8%]">
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
                  className="appearance-none block w-[25%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
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
                  className="appearance-none block w-[25%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
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
                  onChange={(e) => dispatch(setWarrantAmount(e.target.value))}
                  placeholder="Warrant Amount."
                  className="appearance-none block w-[25%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
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
                  className="appearance-none block w-[25%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex space-x-2 mt-3 ml-[6%]">
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-4 py-2 border-full rounded"
        >
          Back
        </button>
        <button
          onClick={() => navigate(`/dashboard/edittransaction/${id}/3`)}
          className="bg-blue-500 text-white px-4 py-2 border-full rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Form3Edit;
