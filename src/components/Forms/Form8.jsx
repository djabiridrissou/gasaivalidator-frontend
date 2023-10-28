import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setAvailableInStore,

  setFileLabelNumber,
  setQuantityInStore,
  setItemDistributedInStore,
  setItemDistributedNotInStore,
  setQuantityInStore1,
  setFileLabelNumber1,
  toggleAvailableInStore,
  toggleAnyAvailableInStore,
} from "../../redux/features/form8Slice";

const Form8 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const disabled = true;
  const { id } = useParams();

  const isItemDistributed = useSelector(
    (state) => state.form7.isItemDistributed
  );

  const availableInStore = useSelector((state) => state.form8.availableInStore);
  const anyAvailableInStore = useSelector(
    (state) => state.form8.anyAvailableInStore
  );
  const fileLabelNumber = useSelector((state) => state.form8.fileLabelNumber);
  const quantityInStore = useSelector((state) => state.form8.quantityInStore);

  const fileLabelNumber1 = useSelector((state) => state.form8.fileLabelNumber1);
  const quantityInStore1 = useSelector((state) => state.form8.quantityInStore1);

  console.log(availableInStore, notAvailableInStore);
  console.log("======", fileLabelNumber1, quantityInStore1);

  const handleAvailableInStore = () => {
    dispatch(setAvailableInStore(true));
    dispatch(setNotAvailableInStore(false));
  };

  // Handle the Team Member checkbox change
  const handleNotAvailableInStock = () => {
    dispatch(setAvailableInStore(false));
    dispatch(setNotAvailableInStore(true));
  };

  const handleItemDistributedInStore = () => {
    dispatch(setItemDistributedInStore(true));
    dispatch(setItemDistributedNotInStore(false));
  };

  // Handle the Team Member checkbox change
  const handleItemDistributedNoInStore = () => {
    dispatch(setItemDistributedInStore(false));
    dispatch(setItemDistributedNotInStore(true));
  };
  return (
    <div>
      {isItemDistributed ? (
        <div className="flex flex-col items-center">
          <label htmlFor="" className=" font-semibold">
            Any available in Store?
          </label>
          <div className="mt-6 ml-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                id="availbleInStore"
                name="availbleInStore"
                checked={anyAvailableInStore}
                onChange={dispatch(toggleAnyAvailableInStore)}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-1 text-[13px]">Yes</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="checkbox"
                id="notAvailbleInStore"
                name="notAvailbleInStore"
                checked={!anyAvailableInStore}
                onChange={dispatch(toggleAnyAvailableInStore)}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-1 text-[13px]">No</span>
            </label>
          </div>

          {anyAvailableInStore && (
            <>
              <div className="mt-2">
                <label htmlFor="fln" className="text-[13.5px] text-gray-700">
                  Quantity in Store
                </label>
                <input
                  type="text"
                  id="qtty"
                  value={quantityInStore}
                  onChange={(e) => dispatch(setQuantityInStore(e.target.value))}
                  placeholder="Quantity in Store"
                  className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
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
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <label htmlFor="" className=" font-semibold">
            Item available in Store?
          </label>
          <div className="mt-6 ml-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                id="itemDistributedInStore"
                name="itemDistributedInStore"
                checked={availableInStore}
                onChange={dispatch(toggleAvailableInStore())}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-1 text-[13px]">Yes</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="checkbox"
                id="itemDistributedNotInStore"
                name="itemDistributedNotInStore"
                checked={!availableInStore}
                onChange={dispatch(toggleAvailableInStore())}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-1 text-[13px]">No</span>
            </label>
          </div>

          {availableInStore && (
            <>
              <div className="mt-2">
                <label htmlFor="fln" className="text-[13.5px] text-gray-700">
                  Quantity in Store
                </label>
                <input
                  type="text"
                  id="qty"
                  value={quantityInStore1}
                  onChange={(e) =>
                    dispatch(setQuantityInStore1(e.target.value))
                  }
                  placeholder="Quantity in Store"
                  className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
                <label htmlFor="fln" className="text-[13.5px] text-gray-700">
                  File Label No.
                </label>
                <input
                  type="text"
                  id="fln"
                  value={fileLabelNumber1}
                  onChange={(e) =>
                    dispatch(setFileLabelNumber1(e.target.value))
                  }
                  placeholder="File Label No"
                  className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
              </div>
            </>
          )}
        </div>
      )}
      <div className="flex space-x-2 mt-3 justify-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-4 py-2 border-full rounded"
        >
          Back
        </button>
        <button
          onClick={() => navigate(`/dashboard/transactiondetails/${id}/7`)}
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

export default Form8;
