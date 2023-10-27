import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  toggleIsItemDistributed,
  setFileLabelNumberItem,
  setQuantityDistributed,
} from "../../redux/editfeatures/form7EditSlice";

const Form7Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const disabled = true;
  const { id } = useParams();

  const isItemDistributed = useSelector(
    (state) => state.form7Edit.isItemDistributed
  );
  const fileLabelNumber = useSelector((state) => state.form7Edit.filelabelnumber);
    const quantityDistributed = useSelector((state) => state.form7Edit.quantitydistributed)
  //console.log(isItemDistributed, fileLabelNumber);

  return (
    <div className="ml-[43%] mt-6">
      <label htmlFor="" className=" font-semibold">Is the item distributed ?</label>
      <div className="mt-6 ml-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            id="isItemDistributedYes"
            name="isItemDistributed"
            checked={isItemDistributed}
            onChange={() => dispatch(toggleIsItemDistributed())}
            className="form-checkbox h-4 w-4"
          />
          <span className="ml-1 text-[13px]">Yes</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="checkbox"
            id="isItemDistributedNo"
            name="isItemDistributed"
            checked={!isItemDistributed}
            onChange={() => dispatch(toggleIsItemDistributed())}
            className="form-checkbox h-4 w-4"
          />
          <span className="ml-1 text-[13px]">No</span>
        </label>
      </div>

      {isItemDistributed && (
        <div className="-ml-[2%] w-[30%]">
          <div className="mt-2">
          <label htmlFor="fln" className="text-[13.5px] text-gray-700">
              Quantity distributed
            </label>
            <input
              type="text"
              id="qtty"
              value={quantityDistributed}
              onChange={(e) => dispatch(setQuantityDistributed(e.target.value))}
              placeholder="File Label No"
              className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
            />
            <label htmlFor="fln" className="text-[13.5px] text-gray-700">
              File Label No.
            </label>
            <input
              type="text"
              id="fln"
              value={fileLabelNumber}
              onChange={(e) => dispatch(setFileLabelNumberItem(e.target.value))}
              placeholder="File Label No"
              className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
            />
          </div>
        </div>
      )}

      <div className="flex space-x-2 mt-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-4 py-2 border-full rounded"
        >
          Back
        </button>
        <button
          onClick={() => navigate(`/dashboard/edittransaction/${id}/6`)}
          className={`bg-green-500 text-white px-4 py-2 border-full rounded ${
            disabled && "bg-green-800/50"
          }`}
          disabled={disabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Form7Edit;
