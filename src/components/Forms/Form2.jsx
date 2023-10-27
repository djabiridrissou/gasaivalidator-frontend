import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAdvancedPayment } from "../../redux/features/form2Slice";
import {
  addTransaction,
  updateTransaction,
  removeTransactions,
} from "../../redux/features/form2Slice";
import { useNavigate, useParams } from "react-router-dom";
import { formatNumber } from "../../functions/helperFunctions";
const Form2 = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const advancedPayment = useSelector((state) => state.form2.advancedPayment);
  const transactions = useSelector((state) => state.form2.transactions);
  const paymentStatus = useSelector((state) => state.form1.paymentStatus);
  //console.log("transaction", transactions);

  const addNewTransaction = () => {
    dispatch(addTransaction());
  };

  const handleTransactionChange = (index, fieldName, value) => {
    //console.log("dans transacchange", index, fieldName, value);
    dispatch(updateTransaction({ index, fieldName, value }));
  };

  const handleBack = () => {
    navigate("/dashboard/goods");
    window.location.reload();
  };

  const handleNext = (e) => {
    navigate(`/dashboard/transactiondetails/${id}/2`);
  };

  const removeTransaction = (index) => {
    // Create a copy of the transactions array and remove the transaction at the specified index
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    dispatch(removeTransactions(updatedTransactions));
  };

  //console.log(advancedPayment);
  return (
    <>
      <div className="mt-6">
        {paymentStatus === "unpaid" && (
          <div>
            <div className="flex justify-center items-center flex-col  mt-4">
              <label htmlFor="" className="font-semibold">
                Any Advanced Payment ?
              </label>
              <div className="flex justify-center mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id="advancedPaymentYes"
                    name="advancedPayment"
                    checked={advancedPayment}
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
                    checked={!advancedPayment}
                    onChange={() => dispatch(toggleAdvancedPayment())}
                    className="form-checkbox h-4 w-4"
                  />
                  <span className="ml-1 text-[13px]">No</span>
                </label>
              </div>
            </div>

            {advancedPayment && (
              <>
                <div className="flex flex-col items-center mt-4">
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
                              value={transactions.paymentDate}
                              onChange={(e) =>
                                handleTransactionChange(
                                  index,
                                  "paymentDate",
                                  e.target.value
                                )
                              }
                              className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="pvNo"
                              className="text-[13.5px] text-gray-700"
                            >
                              PV NO.
                            </label>
                            <input
                              type="text"
                              id="pvNo"
                              value={transactions.pvNo}
                              onChange={(e) =>
                                handleTransactionChange(
                                  index,
                                  "pvNo",
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
                              value={transactions.amountPaid}
                              onChange={(e) => {
                                const formattedValue = formatNumber(
                                  e.target.value
                                );
                                handleTransactionChange(
                                  index,
                                  "amountPaid",
                                formattedValue
                                )
                              }
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
              </>
            )}
          </div>
        )}

        {paymentStatus === "partial payment" && (
          <>
            <div className="flex flex-col items-center mt-3">
              <label htmlFor="" className="font-bold mb-2">
                Provide payment details
              </label>
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
                          value={transactions.paymentDate}
                          onChange={(e) =>
                            handleTransactionChange(
                              index,
                              "paymentDate",
                              e.target.value
                            )
                          }
                          className="appearance-none block w-full text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="pvNo"
                          className="text-[13.5px] text-gray-700"
                        >
                          PV NO.
                        </label>
                        <input
                          type="text"
                          id="pvNo"
                          value={transactions.pvNo}
                          onChange={(e) =>
                            handleTransactionChange(
                              index,
                              "pvNo",
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
                          value={transactions.amountPaid}
                          onChange={(e) => {
                            const formattedValue = formatNumber(
                              e.target.value
                            );
                            handleTransactionChange(
                              index,
                              "amountPaid",
                             formattedValue
                            )
                          }
                            
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
          </>
        )}
        <div className="flex justify-center space-x-2 mt-6">
          <button
            onClick={handleBack}
            className="bg-black text-white px-4 py-2 border-full rounded"
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

export default Form2;
