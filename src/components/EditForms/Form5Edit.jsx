import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleTransactionInGIFMIS,
  setPurchaseOrderNo,
  setInvoiceNo,
  setFileLabelNumberGifmis,
} from "../../redux/editfeatures/form5EditSlice";
const Form5Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const transactionInGIFMIS = useSelector(
    (state) => state.form5Edit.transactioningifmis
  );

  const purchaseOrderNo = useSelector((state) => state.form5Edit.purchaseorderno);
  const invoiceNo = useSelector((state) => state.form5Edit.invoiceno);
  const fileLabelNumber = useSelector((state) => state.form5Edit.filelabelnumber);
  const expenditureType = useSelector((state) => state.form4Edit.expendituretype);

  console.log(invoiceNo);
  return (
    <div>
     
    <div className="ml-[43%] mt-6">
      <label htmlFor="" className="text-[1'.5px] font-semibold">Transaction in GIFMIS ?</label>
      <div className="mt-2 ml-[2%]">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            id="transactionInGIFMISYes"
            name="transactionInGIFMIS"
            checked={transactionInGIFMIS}
            onChange={() => dispatch(toggleTransactionInGIFMIS())}
            className="form-checkbox h-4 w-4"
          />
          <span className="ml-1 text-[13px]">Yes</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="checkbox"
            id="transactionInGIFMISNo"
            name="transactionInGIFMIS"
            checked={!transactionInGIFMIS}
            onChange={() => dispatch(toggleTransactionInGIFMIS())}
            className="form-checkbox h-4 w-4"
          />
          <span className="ml-1 text-[13px]">No</span>
        </label>
      </div>

      {transactionInGIFMIS && (
        <div className="-ml-[2%] w-[20%]">
          <div>
            <label
              htmlFor="purchaseorderno"
              className="text-[13.5px] text-gray-700"
            >
              Purchase Order Number
            </label>
            <input
              type="text"
              id="purchaseorderno"
              value={purchaseOrderNo}
              onChange={(e) => dispatch(setPurchaseOrderNo(e.target.value))}
              placeholder="Contract No."
              className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
            />
          </div>
          <div>
            <label htmlFor="invoiceno" className="text-[13.5px] text-gray-700">
              Invoice No.
            </label>
            <input
              type="text"
              id="invoiceno"
              value={invoiceNo}
              onChange={(e) => dispatch(setInvoiceNo(e.target.value))}
              placeholder="Invoice No"
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
              onChange={(e) => dispatch(setFileLabelNumberGifmis(e.target.value))}
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
          onClick={() => navigate(`/dashboard/edittransaction/${id}/5`)}
          className="bg-blue-500 text-white px-4 py-2 border-full rounded"
        >
          Next
        </button>
      </div>
    </div>
   
    </div>
  

  );
};

export default Form5Edit;
