import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setAvailableInStore,
  setQuantityInStore,
  setFileLabelNumberInStore,
  toggleAvailableInStore,
  toggleAnyAvailableInStore,
  setQuantitySendToStore,
  setFileLabelNumberSendToStore,
} from "../../redux/features/form8Slice";

const Form8 = () => {
  const currentPath = window.location.pathname;
  console.log("Chemin actuel : " + currentPath);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const disabled = true;
  const { id } = useParams();

  const isItemDistributed = useSelector((state) => state.form7.isItemDistributed);

  const availableInStore = useSelector((state) => state.form8.availableInStore);
  const anyAvailableInStore = useSelector((state) => state.form8.anyAvailableInStore);

 
  const quantityInStore = useSelector((state) => state.form8.quantityInStore);
  const fileLabelNumberInStore = useSelector((state) => state.form8.fileLabelNumberInStore);
  const quantitySendToStore = useSelector((state) => state.form8.quantitySendToStore);
  const fileLabelNumberSendToStore = useSelector((state) => state.form8.fileLabelNumberSendToStore);

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
  
    let formattedDecimalPart =
      decimalPart && decimalPart.length > 2
        ? decimalPart.slice(0, 2)
        : decimalPart || "00";
  
    // Handle backspace for the first '0' after the "."
    if (formattedDecimalPart.length === 2 && formattedDecimalPart[0] === "0") {
      formattedDecimalPart = formattedDecimalPart[1];
    }
  
    // Combine the integer and decimal parts
    const formattedValue =
      decimalPart === undefined
        ? formattedIntegerPart
        : `${formattedIntegerPart}.${formattedDecimalPart}`;
  
    return formattedValue;
  };
  
  // Test

  

  // Handle the Team Member checkbox change
 
const handleAnyAvailableInStore = (e) => {
  dispatch(toggleAnyAvailableInStore());
}

const handleAvailableInStore = (e) => {
  dispatch(toggleAvailableInStore());
}
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
                onChange={handleAnyAvailableInStore}
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
                onChange={handleAnyAvailableInStore}
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
                  value={quantitySendToStore}
                  onChange={(e) => {
                    const formattedValue = formatNumber(e.target.value);
                    dispatch(setQuantitySendToStore(formattedValue))}}
                  placeholder="Quantity in Store"
                  className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
                <label htmlFor="fln" className="text-[13.5px] text-gray-700">
                  File Label No.
                </label>
                <input
                  type="text"
                  id="fln"
                  value={fileLabelNumberSendToStore}
                  onChange={(e) => dispatch(setFileLabelNumberSendToStore(e.target.value))}
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
                onChange={handleAvailableInStore}
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
                onChange={handleAvailableInStore}
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
                  value={quantityInStore}
                  onChange={(e) => {
                    const formattedValue = formatNumber(e.target.value);
                    dispatch(setQuantityInStore(formattedValue))}
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
                  value={fileLabelNumberInStore}
                  onChange={(e) =>{
                    dispatch(setFileLabelNumberInStore(e.target.value))}
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
        {currentPath.startsWith("/dashboard/transactiondetails") && (
          <div>
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

        )}

{currentPath.startsWith("/dashboard/edittransaction") && (
          <div>
             <button
          onClick={() => navigate(`/dashboard/edittransaction/${id}/7`)}
          className={`bg-green-500 text-white px-4 py-2 border-full rounded ${
            disabled && "bg-green-800/50"
          }`}
          disabled={disabled}
        >
          Next
        </button>
          </div>

        )}

       
      </div>
    </div>
  );
};

export default Form8;
