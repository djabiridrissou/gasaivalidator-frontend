import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setPaymentStatus,
  addTransaction,
  updateTransaction,
  removeTransactions,
  setTransactions,
  toggleIsJobDone,
} from "../../redux/features/form1Slice";
import Form2 from "./Form2";
import { formatNumber } from "../../functions/helperFunctions";

const Form1 = () => {
  const currentPath = window.location.pathname;
console.log("Chemin actuel : " + currentPath);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paymentStatus = useSelector((state) => state.form1.paymentStatus);
  const transactions = useSelector((state) => state.form1.transactions);
  const isJobDone = useSelector((state) => state.form1.isJobDone);
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
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    dispatch(removeTransactions(updatedTransactions));
  };

  return (
    <div className="">
      <div className="flex justify-center items-center">
        <div className="mb-3 flex flex-col justify-center flex-wrap">
          <label
            htmlFor="paymentStatus"
            className="block mt-5 mb-2  text-[13.5px] text-gray-700 font-semibold"
          >
            Choose Current Payment Status
          </label>
          <select
            name="paymentStatus"
            id="paymentStatus"
            value={paymentStatus}
            onChange={handlePaymentStatusChange}
            className={`mt-3 block text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
          >
            <option value="">------------------------</option>
            <option value="fully paid">Fully paid</option>
            <option value="partial payment">Partial payment</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      {/* {paymentStatus === "fully paid" &&
<div className="flex flex-col justifiy-center justify-between items-center">
<label htmlFor="availableContracts" className="font-semibold">
       Is the Job Done ?
      </label>
      <div className="mt-2">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            id="isJobDoneNo"
            name="isJobDone"
            checked={isJobDone}
            onChange={() => dispatch(toggleIsJobDone())}
            className="form-checkbox h-4 w-4"
          />
          <span className="ml-1 text-[13px]">Yes</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="checkbox"
            id="isJobDoneYes"
            name="isJobDone"
            checked={!isJobDone}
            onChange={() => dispatch(toggleIsJobDone())}
            className="form-checkbox h-4 w-4"
          />
          <span className="ml-1 text-[13px]">No</span>
        </label>
      </div>

        {transactions?.map((transactions, index) => (
          <Fragment key={index}>
            <div className="flex justify-center">
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
                    value={transactions.paymentDate}
                    onChange={(e) =>
                      handleTransactionChange(
                        index,
                        "paymentDate",
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
                    value={transactions.pvNo}
                    onChange={(e) =>
                      handleTransactionChange(index, "pvNo", e.target.value)
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
                    value={transactions.amountPaid}
                    onChange={(e) => {
                      const formattedValue = formatNumber(e.target.value);
                      handleTransactionChange(
                        index,
                        "amountPaid",
                        formattedValue
                      );
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
                    value={transactions.fileLabelNumber}
                    onChange={(e) =>
                      handleTransactionChange(
                        index,
                        "fileLabelNumber",
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
</div>
     } */}

      {paymentStatus === "unpaid" && (
        <>
          <Form2 />
        </>
      )}
      {(paymentStatus === "partial payment")  && (
        <>
          <Form2 />
        </>
      )}

{(paymentStatus === "fully paid")  && (
        <>
          <Form2 />
        </>
      )}
    </div>
  );
};

export default Form1;
