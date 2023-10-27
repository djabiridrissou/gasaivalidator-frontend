import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  toggleIsItemDistributed,
  setFileLabelNumber,
  setQuantityDistributed,
} from "../../redux/features/form7Slice";

const Form7 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const disabled = false;
  const { id } = useParams();

  const isItemDistributed = useSelector(
    (state) => state.form7.isItemDistributed
  );
  const fileLabelNumber = useSelector((state) => state.form7.fileLabelNumber);
  const quantityDistributed = useSelector(
    (state) => state.form7.quantityDistributed
  );
  console.log(quantityDistributed, fileLabelNumber);

  return (
    <div className="mt-6">
      <div className="flex flex-col items-center">
        <label htmlFor="" className=" font-semibold">
          Is the item distributed ?
        </label>
        <div className="mt-3">
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
      </div>

      {isItemDistributed && (
        <div className=" flex justify-center mt-2">
          <div className="mt-2 mb-2 space-y-3">
            <div>
              <label htmlFor="fln" className="text-[13.5px] text-gray-700">
                Quantity distributed
              </label>
              <input
                type="text"
                id="qtty"
                value={quantityDistributed}
                onChange={(e) =>
                  dispatch(setQuantityDistributed(e.target.value))
                }
                placeholder="Quantity Distributed"
                className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
              />
            </div>
            <div>
              <label htmlFor="fln" className="text-[13.5px] text-gray-700">
                File Label No.
              </label>
              <input
                type="text"
                id="fln"
                value={fileLabelNumber}
                onChange={(e) => dispatch(setFileLabelNumber(e.target.value))}
                placeholder="File Label No"
                className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center space-x-2 mt-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-4 py-2 border-full rounded"
        >
          Back
        </button>
        <button
          onClick={() => navigate(`/dashboard/transactiondetails/${id}/7`)}
          className={`bg-blue-500 text-white px-4 py-2 border-full rounded ${
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

export default Form7;
