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

      {paymentStatus === "unpaid" && (
        <>
          <Form2 />
        </>
      )}
      {(paymentStatus === "partial payment") && (
        <>
          <Form2 />
        </>
      )}

      {(paymentStatus === "fully paid") && (
        <>
          <Form2 />
        </>
      )}
    </div>
  );
};

export default Form1;
