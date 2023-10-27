import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAdvancedPayment } from "../../redux/editfeatures/form2EditSlice";
import {
  addTransaction,
  updateTransaction,
  removeTransactions,

} from "../../redux/editfeatures/form2EditSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  setFundingType,
  setWarrantSupported,
  setWarrantDate,
  setWarrantNo,
  setFileLabelNumber,
  setWarrantAmount,
} from "../../redux/editfeatures/Form3EditSlice";
const Form2Edit = ({ data }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const advancedpayment = useSelector((state) => state.form2Edit.advancedPayment);
  console.log("advancedpayment", advancedpayment);
  const transactions = useSelector((state) => state.form2Edit.transactions);

  useEffect(() => {
     
  }, []);
  const addNewTransaction = () => {
    dispatch(addTransaction());
  };

  const handleTransactionChange = (index, fieldName, value) => {
    dispatch(updateTransaction({ index, fieldName, value }));
  };

  const handleBack = () => {
    navigate("/dashboard/goods");
    window.location.reload();
  };

  const handleNext = (e) => {
    navigate(`/dashboard/edittransaction/${id}/2`)
  }

  const removeTransaction = (index) => {
    // Create a copy of the transactions array and remove the transaction at the specified index
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    dispatch(removeTransactions(updatedTransactions));
  };
  //console.log(advancedPayment);
  return (
    <>
      <div className="-ml-[4%] mt-6">
        <div className="flex justify-center items-center flex-col ml-[4rem] mt-4">
          <label htmlFor="" className="font-semibold -ml-[4%]">Any Advanced Payment ?</label>
          <div className="mt-2 -ml-[4%]">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                id="advancedPaymentYes"
                name="advancedPayment"
                checked={advancedpayment}
                onChange={() => {
                  dispatch(toggleAdvancedPayment());
                  //dispatch(setAdvancedPayment);

                }}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-1 text-[13px]">Yes</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="checkbox"
                id="advancedPaymentNo"
                name="advancedPayment"
                checked={!advancedpayment}
                onChange={() => dispatch(toggleAdvancedPayment())}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-1 text-[13px]">No</span>
            </label>
          </div>
        </div>

        {advancedpayment && (
          <>
            <div className="mt-3 ml-[23%]">
              {transactions.map((transactions, index) => (
                <Fragment key={index}>
                  <div>
                    <div className="flex gap-2 items-center">

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
                          className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="pvno"
                          className="text-[13.5px] text-gray-700"
                        >
                          PV NO.
                        </label>
                        <input
                          type="text"
                          id="pvno"
                          value={transactions.pvno}
                          onChange={(e) =>
                            handleTransactionChange(
                              index,
                              "pvno",
                              e.target.value
                            )
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
                          id="invoiceAmount"
                          value={transactions.amountpaid}
                          onChange={(e) =>
                            handleTransactionChange(
                              index,
                              "amountpaid",
                              e.target.value
                            )
                          }
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
            </div>
          </>
        )}
        <div className="flex space-x-2 mt-4 -ml-[12rem]">
          <button
            onClick={handleBack}
            className="bg-black text-white px-4 py-2 border-full rounded ml-[49%]"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 border-full rounded"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Form2Edit;
