import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleIsItemSupplied,
  toggleIsServiceCompleted,
  addSuppliance,
  updateSuppliance,
  updateService,
  removeSuppliances,
} from "../../redux/editfeatures/form6EditSlice";

const Form6Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const suppliances = useSelector((state) => state.form6Edit.suppliances);
  const isItemSupplied = useSelector((state) => state.form6Edit.isItemSupplied);
  const isServiceCompleted = useSelector((state) => state.form6Edit.isServiceCompleted);
  const services = useSelector((state) => state.form6Edit.services);
  
  const expenditureType = useSelector((state) => state.form4Edit.expendituretype);
 /*  const certificationOfCompletionDate = useSelector((state) => state.form6.certificationOfCompletionDate);

  const percentageOfCompletion = useSelector((state) => state.form6.percentageOfCompletion);
  const serviceFileLabelNumber = useSelector((state) => state.form6.serviceFileLabelNumber); */

  const addNewSuppliance = () => {
    dispatch(addSuppliance());
  }

  const handleSupplianceChange = (index, fieldName, value) => {
    dispatch(updateSuppliance({ index, fieldName, value }));
  }
  const handleServiceChange = (index, fieldName, value) => {
    dispatch(updateService({ index, fieldName, value }));
  }

  const removeSuppliance = (index) => {
    const updatedSuppliances = [...suppliances];
    updatedSuppliances.splice(index, 1);
    dispatch(removeSuppliances(updatedSuppliances))
  }

  //console.log("isService", isServiceCompleted);
  console.log("isItemSupplied", isItemSupplied);
  console.log("expendituretype", expenditureType);
  return (
    <div>
      {expenditureType === "Goods" && (
        <div className="ml-[43%] mt-6">
      <label htmlFor="isItemSupplied" className=" font-semibold ml-[2%]">Is the item supplied ?</label>
      <div className="mt-2 ml-[2%]">
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

      {isItemSupplied && (
        <div>
          {suppliances.map((suppliance, index) => (
            <Fragment key={index}>
              <div className="-ml-[32%] flex flex-row">
                <div>
                  <label htmlFor="sraDate" className="text-[13.5px] text-gray-700">
                    Date of Store Receipt
                  </label>
                  <input
                    type="date"
                    id="sraDate"
                    value={suppliance.sradate}
                    onChange={(e) => handleSupplianceChange(index, 'sraDate', e.target.value)}
                    className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                  />
                </div>{" "}
                <div>
                  <label htmlFor="receiptBy" className="text-[13.5px] text-gray-700">
                    Receipt by
                  </label>
                  <input
                    type="text"
                    id="receiptBy"
                    value={suppliance.receiptby}
                    onChange={(e) => handleSupplianceChange(index, 'receiptBy', e.target.value)}
                    placeholder="Receiving Officer's Name"
                    className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                  />
                </div>{" "}
                <div>
                  <label htmlFor="quantity" className="text-[13.5px] text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    value={suppliance.quantity}
                    onChange={(e) => handleSupplianceChange(index, 'quantity', e.target.value)}
                    placeholder="Quantity"
                    className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                  />
                </div>
                <div>
                  <label htmlFor="fln" className="text-[13.5px] text-gray-700">
                    File Label No.
                  </label>
                  <input
                    type="text"
                    id="fln"
                    value={suppliance.filelabelnumber}
                    onChange={(e) => handleSupplianceChange(index, 'fileLabelNumber', e.target.value)}
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

      <div className="flex space-x-2 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-4 py-2 border-full rounded"
        >
          Back
        </button>
        <button
          onClick={() => navigate(`/dashboard/edittransaction/${id}/6`)}
          className={`bg-blue-500 text-white px-4 py-2 border-full rounded ${!isItemSupplied && "bg-green-800/50"}`}
          disabled={!isItemSupplied} // Disable the button if isItemSupplied is false
        >
          Next
        </button>
      </div>
      </div>
      )}
      {expenditureType === "Service" && (
         <div className="ml-[43%] mt-6">
         <label htmlFor="isItemSupplied" className=" font-semibold -ml-[4%]">Is the service successfully completed ?</label>
         <div className="mt-2 ml-[2%]">
           <label className="inline-flex items-center">
             <input
               type="checkbox"
               id="isServiceCompleted"
               name="isServiceCompleted"
               checked={isServiceCompleted}
               onChange={() => dispatch(toggleIsServiceCompleted())}
               className="form-checkbox h-4 w-4"
             />
             <span className="ml-1 text-[13px]">Yes</span>
           </label>
           <label className="inline-flex items-center ml-6">
             <input
               type="checkbox"
               id="isServiceCompleted"
               name="isServiceCompleted"
               checked={!isServiceCompleted}
               onChange={() => dispatch(toggleIsServiceCompleted())}
               className="form-checkbox h-4 w-4"
             />
             <span className="ml-1 text-[13px]">No</span>
           </label>
         </div>
   
         {isServiceCompleted && (
           <div>
            {services.map((service, index) => (
               <Fragment key={index}>
                 <div className="-ml-[20%] flex flex-row">
                   <div className="mr-[2%]">
                     <label htmlFor="sradate" className="text-[13.5px] text-gray-700">
                       Certification of Completion Date
                     </label>
                     <input
                       type="date"
                       id="certificationOfCompletionDate"
                       name="certificationofcompletiondate"
                       value={service.certificationofcompletiondate}
                       onChange={(e) => handleServiceChange(index, 'certificationofcompletiondate', e.target.value)}
                       className="appearance-none block w-[100%] text-[0.9rem] px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                     />
                   </div>{" "}
                   <div>
                     <label htmlFor="receiptby" className="text-[13.5px] text-gray-700">
                       Percentage of completion
                     </label>
                     <input
                       type="text"
                       id="percentageofcompletion"
                       name="percentageofcompletion"
                       value={service.percentageofcompletion}
                       onChange={(e) => handleServiceChange(index, 'percentageofcompletion', e.target.value)}
                       placeholder="Percentage of completion"
                       className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                     />
                   </div>{" "}
                   <div>
                     <label htmlFor="fln" className="text-[13.5px] text-gray-700">
                       File Label Number
                     </label>
                     <input
                       type="text"
                       id="servicefilelabelnumber"
                       name="servicefilelabelnumber"
                       value={service.filelabelnumber}
                       onChange={(e) => handleServiceChange(index, 'filelabelnumber', e.target.value)}
                       placeholder="File Label Number"
                       className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                     />
                   </div>
                  {/*  <button
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
                     </button> */}
                   {/* )} */}
                 </div>
               </Fragment>
             ))}
           </div>
         )}
   
         <div className="flex space-x-2 mt-6">
           <button
             onClick={() => navigate(-1)}
             className="bg-black text-white px-4 py-2 border-full rounded"
           >
             Back
           </button>
           {expenditureType != "Service" && (
           <button
             onClick={() => navigate(`/dashboard/edittransaction/${id}/6`)}
             className={`bg-blue-500 text-white px-4 py-2 border-full rounded ${!isItemSupplied && "bg-green-800/50"}`}
             disabled={!isItemSupplied} // Disable the button if isItemSupplied is false
           >
             Next
           </button>
           )}
         </div>
         </div>
      )}
      
    </div>
    
  );
};

export default Form6Edit;
