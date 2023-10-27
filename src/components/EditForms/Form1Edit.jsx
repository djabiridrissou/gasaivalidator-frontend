import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { server } from "../../server/server";
import {
  setPaymentStatus,
  addTransaction,
  updateTransaction,
  removeTransactions,
} from "../../redux/editfeatures/form1EditSlice";
import Form2Edit from "./Form2Edit";

const Form1Edit = () => {
  const dispatch = useDispatch();
  const paymentStatus = useSelector((state) => state.form1Edit.paymentStatus);
  const transactions = useSelector((state) => state.form1Edit.transactions);

  const handlePaymentStatusChange = (e) => {
    dispatch(setPaymentStatus(e.target.value));
  };

  const addNewTransaction = () => {
    dispatch(addTransaction());
  };

  const handleTransactionChange = (index, fieldName, value) => {
    dispatch(updateTransaction({ index, fieldName, value }));
  };

  const removeTransaction = (index) => {
    // Create a copy of the transactions array and remove the transaction at the specified index
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    dispatch(removeTransactions(updatedTransactions));
  };

  return (
    <div>
      <div className="flex justify-center items-center -ml-[12rem]" >
        <div className="mb-3 flex items-center justify-center flex-wrap mr-[6rem]">
          <label
            htmlFor="paymentStatus"
            className="block mt-5 mb-2 -mr-2  ml-4 text-sm text-[13.5px] text-gray-700 font-semibold"
          >
            Choose the Current Payment Status
          </label>
          <select
            name="paymentStatus"
            id="paymentStatus"
            value={paymentStatus}
            onChange={handlePaymentStatusChange}
            className={`mt-3 ml-8 block w-[0.5/4] text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
          >
            <option value="">------------------------</option>
            <option value="fully paid">Fully paid</option>
            <option value="partial payment">Partial payment</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      {paymentStatus === "fully paid" &&
        transactions.map((transactions, index) => (
          <Fragment key={index}>
            <div className="flex ml-[23%]">
              <div className="flex gap-2 justify-center items-center">
                <div>
                  <label
                    htmlFor="paymentDate"
                    className="text-[13.5px] text-gray-700"
                  >
                    Payment Date
                  </label>
                  <input
                    type="date"
                    id="paymentDate"
                    value={transactions.paymentdate}
                    onChange={(e) =>
                      handleTransactionChange(
                        index,
                        "paymentdate",
                        e.target.value
                      )
                    }
                    className="cursor-pointer appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                  />
                </div>
                <div>
                  <label htmlFor="pvNo" className="text-[13.5px] text-gray-700">
                    PV NO.
                  </label>
                  <input
                    type="text"
                    id="pvNo"
                    value={transactions.pvno}
                    onChange={(e) =>
                      handleTransactionChange(index, "pvno", e.target.value)
                    }
                    placeholder="PV No."
                    className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="invoiceAmount"
                    className="text-[13.5px] text-gray-700"
                  >
                    Amount Paid
                  </label>
                  <input
                    type="text"
                    id="amountPaid"
                    value={transactions.amountpaid}
                    onChange={(e) => {
                      /* if (e.target.value === "") {
                        e.target.value = 0;
                      }
                      const value = e.target.value.replace(/,/g, '');

                      if (/^-?\d*\.?\d*$/.test(value) || /^-?\d*\.?$/.test(value)) {
                        // La valeur est un nombre valide (y compris . et - si nécessaire).
                        const numericValue = parseFloat(value);
                        const formattedValue = numericValue.toLocaleString();
                        handleTransactionChange(index, "amountPaid", formattedValue);
                      } else {
                        // La valeur n'est pas un nombre valide.
                      } */
                      handleTransactionChange(index, "amountpaid", e.target.value);
                    }}
                    placeholder="Amount Paid"
                    className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
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
                    value={transactions.filelabelnumber}
                    onChange={(e) =>
                      handleTransactionChange(
                        index,
                        "filelabelnumber",
                        e.target.value
                      )
                    }
                    placeholder="File Label No."
                    className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                  />
                </div>
                <button
                  className="font-medium bg-green-700 px-[0.8rem] py-[0.15rem] mt-6"
                  onClick={addNewTransaction}
                >
                  <span>+</span>
                </button>
                {index > 0 && (
                  <button
                    className="font-medium bg-red-700 px-[0.8rem] py-[0.15rem] mt-6"
                    onClick={() => removeTransaction(index)}
                  >
                    <span>-</span>
                  </button>
                )}
              </div>
            </div>
          </Fragment>
        ))}

      {paymentStatus === "partial payment" &&
        (
          <>

            <Form2Edit />
          </>
        )}
      {paymentStatus === "unpaid" && <div>{paymentStatus}</div>}
    </div>
  );
};

export default Form1Edit;
