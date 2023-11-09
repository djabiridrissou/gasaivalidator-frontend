import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleTransactionInGIFMIS,
  setPurchaseOrderNo,
  setInvoiceNo,
  setFileLabelNumberGifmis,
  setInvoiceDate,
} from "../../redux/features/form5Slice";
import { current } from "@reduxjs/toolkit";
const Form5 = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentPath = window.location.pathname;
  console.log("Chemin actuel : " + currentPath);
  const transactionInGIFMIS = useSelector(
    (state) => state.form5.transactionInGIFMIS
  );
  const allowanceName = useSelector((state) => state.form4.allowanceName);
  const purchaseOrderNo = useSelector((state) => state.form5.purchaseOrderNo);
  const invoiceNo = useSelector((state) => state.form5.invoiceNo);
  const fileLabelNumber = useSelector((state) => state.form5.fileLabelNumber);
  const invoiceDate = useSelector((state) => state.form5.invoiceDate);
  const expenditureType = useSelector((state) => state.form4.expenditureType);
  const workType = useSelector((state) => state.form4.workType);
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
  
    // Limit the decimal part to two decimal places
    const formattedDecimalPart =
      decimalPart && decimalPart.length > 2
        ? decimalPart.slice(0, 2)
        : decimalPart || "00";
  
    // Combine the integer and decimal parts
    const formattedValue =
      decimalPart === undefined
        ? formattedIntegerPart
        : `${formattedIntegerPart}.${formattedDecimalPart}`;
  
    return formattedValue;
  };
  
  return (
    <div>
      <div className="mt-6">
        <div className="flex flex-col items-center mb-2">
          <label htmlFor="" className="text-[1'.5px] font-semibold">
            Transaction in GIFMIS ?
          </label>
          <div className=" mt-2">
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
        </div>

        {transactionInGIFMIS && (
          <div className="flex justify-center gap-3">
            {expenditureType != "Compensation" && (
              <div className="">
                <label
                  htmlFor="purchaseOrderNo"
                  className="text-[13.5px] text-gray-700"
                >
                  Purchase Order Number
                </label>
                <input
                  type="text"
                  id="purchaseOrderNo"
                  value={purchaseOrderNo}
                  onChange={(e) => dispatch(setPurchaseOrderNo(e.target.value))}
                  placeholder="Contract No."
                  className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="invoiceNo"
                className="text-[13.5px] text-gray-700"
              >
                Invoice No.
              </label>
              <input
                type="text"
                id="invoiceNo"
                value={invoiceNo}
                onChange={(e) => dispatch(setInvoiceNo(e.target.value))}
                placeholder="Invoice No"
                className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
              />
            </div>
            <div>
              <label
                htmlFor="invoiceNo"
                className="text-[13.5px] text-gray-700"
              >
                Invoice Date
              </label>
              <input
                type="date"
                id="invoiceDate"
                value={invoiceDate}
                onChange={(e) => dispatch(setInvoiceDate(e.target.value))}
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

        <div className="flex justify-center space-x-2 mt-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-black text-white px-4 py-2 border-full rounded"
          >
            Back
          </button>
          {currentPath.startsWith("/dashboard/transactiondetails") && (
            <div>
              {((expenditureType === "Works" && (workType != "Road" && workType != "Bridge" && workType != "Sea Defence & Drainage")) || expenditureType === "Goods" || expenditureType === "Service") && (
                <button
                  onClick={() => {
                    if (transactionInGIFMIS) {
                      if (!purchaseOrderNo || !invoiceNo || !invoiceDate || !fileLabelNumber) {
                        return;
                      }
                    }
                    navigate(`/dashboard/transactiondetails/${id}/5`)}}
                  className="bg-blue-500 text-white px-4 py-2 border-full rounded"
                >
                  Next
                </button>
              )}

             
            </div>

          )}
          {currentPath.startsWith("/dashboard/edittransaction") && (
            <div>
              {((expenditureType === "Works" && (workType != "Road" && workType != "Bridge" && workType != "Sea Defence & Drainage")) || expenditureType === "Goods" || expenditureType === "Service") && (
                <button
                  onClick={() => {
                    if (transactionInGIFMIS) {
                      if (!purchaseOrderNo || !invoiceNo || !invoiceDate || !fileLabelNumber) {
                        return;
                      }
                    }
                    navigate(`/dashboard/edittransaction/${id}/5`)}}
                  className="bg-blue-500 text-white px-4 py-2 border-full rounded"
                >
                  Next
                </button>
              )}
            </div>

          )}

        </div>
      </div>
    </div>
  );
};

export default Form5;
