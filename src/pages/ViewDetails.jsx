import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server/server";
import {
  formatDate,
  formatFinancialNumber,
} from "../functions/helperFunctions";
import { useSelector, useDispatch } from "react-redux";
import { getAllGifmisProcessed } from "../redux/features/gifmis-processed";
import { useNavigate } from "react-router-dom";

const ViewDetails = ({ transaction }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const transactions = useSelector((state) => state.gifmisProcessed.gifmisProcessed);
  console.log("transactions", transactions.length);
 
  const [details, setDetails] = useState();

  useEffect(() => {
    if (transactions.length === 0) {
      navigate("/dashboard/gifmisprocessed");
    }
    setDetails(transactions.find(e => e?.id == id));
  }, [transactions]);

  /* 
    console.log("details", details) */

  return (
    <>
      <h1 className="text-center font-bold text-3xl">
        {details?.gifmis?.vendorname}
      </h1>
      <div className="w-[98.5%] mx-auto  flex justify-evenly  text-[13px] mt-2 p-2">
        {/* left */}
        <section className="space-y-3">
          <p>
            <span className="font-semibold">ORGNAME:</span>{" "}
            {details?.gifmis?.orgname}
          </p>
          <p>
            <span className="font-semibold">OUTSTANDING CLAIM:</span>{" "}
            {(details?.gifmis?.outstandingclaim)?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p>
            <span className="font-semibold">DESCRIPTION:</span>{" "}
            {details?.gifmis?.description}
          </p>

          <p>
            <span className="font-semibold">REVISED CONTRACT AMOUNT:</span>{" "}
            {formatFinancialNumber(
              Number(details?.gifmis?.revisedcontractamount)
            )}
          </p>

          <p>
            <span className="font-semibold">AVAILABLE BUDGET:</span>{" "}
            {details?.availablebudget?.advancedpayment === true ? "Yes" : "No"}
          </p>

          <p>
            <span className="font-semibold">BUDGET FILE LABEL NUMBER:</span>{" "}
            {details?.budgetfilelabelnumber === "" ? "-" : details?.budgetfilelabelnumber}
          </p>

          <p>
            <span className="font-semibold">FUNDING TYPE:</span>{" "}
            {details?.fundingtype === "" ? "-" : details?.fundingtype}
          </p>

          <p>
            <span className="font-semibold">INVOICE NUMBER:</span>{" "}
            {details?.invoiceno === "" ? "-" : details?.invoiceno}
          </p>

          <p>
            <span className="font-semibold">INV PAYMENT STATUS:</span>{" "}
            {details?.payment === "" ? "-" : details?.payment}
          </p>

          <p>
            <span className="font-semibold">ADVANCED PAYMENT:</span>{" "}
            {details?.advancedpayment === true ? "Yes" : "No"}
          </p>

          <p>
            <span className="font-semibold">IPC SUPPORTED:</span>{" "}
            {details?.ipcsupported === true ? "Yes" : "No"}
          </p>

          <p>
            <span className="font-semibold">PURCHASE ORDER NUMBER:</span>{" "}
            {details?.purchasedorderno === "" ? "-" : details?.purchasedorderno}
          </p>

          {/* <div className="max-h-[80vh] overflow-y-scroll">
            <table className="table-auto w-full bg-white text-[13px]">
              <thead className="sticky -top-1 bg-gray-100">
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 text-left ">ID</th>
                  <th className="border border-gray-200 text-left ">PV NO</th>
                  <th className="border border-gray-200  ">FLN</th>
                  <th className="border border-gray-200  ">PAYMENT DATE</th>
                  <th className="border border-gray-200  ">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {console.log(
                  "items are ",
                  details?.transactionDetails?.transactions
                )}
                {details?.transactionDetails?.transactions &&
                details?.transactionDetails?.transactions.length > 0 ? (
                  details?.transactionDetails?.transactions?.map(
                    (item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td className="border-y text-left ">{itemIndex + 1}</td>
                        <td className="border-y text-left ">{item?.pvno}</td>
                        <td className="border-y text-left truncate-25 ">
                          {item?.paymentdate}
                        </td>
                        <td
                          className="border-y text-left truncate-25"
                          title={item?.filelabelnumber}
                        >
                          {item?.filelabelnumber}
                        </td>
                        <td
                          className="border-y text-left truncate-25"
                          title={item?.amountpaid}
                        >
                          {item?.amountpaid}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td className="border-y text-center py-2" colSpan="12">
                      <span className="text-red-500 font-extrabold text-[12px]">
                        No data found
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div> */}
        </section>

        {/* right */}
        <section className="space-y-3">
          <p>
            <span className="font-semibold">WARRANT SUPPORTED:</span>{" "}
            {details?.warrantsupported === true ? "Yes" : "No"}
          </p>

          <p>
            <span className="font-semibold">WARRANT DATE:</span>{" "}
            {formatDate(details?.warrantdate)}
          </p>

          <p>
            <span className="font-semibold">WARRANT NO:</span>{" "}
            {details?.warrantno}
          </p>

          <p>
            <span className="font-semibold">WARRANT FILE LABEL NO:</span>{" "}
            {details?.warrantfilelabelnumber}
          </p>

          <p>
            <span className="font-semibold">WARRANT AMOUNT:</span>{" "}
            {(details?.warrantamount)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
          </p>

          <p>
            <span className="font-semibold">EXPENDITURE TYPE:</span>{" "}
            {details?.expendituretype === "" ? "-" : details?.expendituretype}
          </p>

          <p>
            <span className="font-semibold">AVAIBLE CONTRACT:</span>{" "}
            {details?.transaction?.availablecontracts === true ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-semibold">AVAIBLE BTA:</span>{" "}
            {details?.transaction?.availablebta === true ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-semibold">ON PREMISE:</span>{" "}
            {details?.transaction?.onpremise === true ? "Yes" : "No"}
          </p>
        </section>
      </div>

      <div className="max-h-[40vh] overflow-y-scroll w-[80%] mx-auto mt-4 card1 p-1">
        <label htmlFor="" className="font-semibold text-[13px] mb-2">
          TRANSACTION(S)
        </label>
        <table className="table-auto w-full bg-white text-[13px]">
          <thead className="sticky -top-1 bg-gray-100">
            <tr className="bg-gray-100">
              <th className="border border-gray-200 text-left ">ID</th>
              <th className="border border-gray-200 text-left ">PV NO</th>
              <th className="border border-gray-200  ">FLN</th>
              <th className="border border-gray-200  ">PAYMENT DATE</th>
              <th className="border border-gray-200  ">AMOUNT</th>
            </tr>
          </thead>
          <tbody>

            {details?.transactions &&
              (details?.transactions).length > 0 ? (
              details?.transactions?.map(
                (item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td className="border-y text-left ">{itemIndex + 1}</td>
                    <td className="border-y text-left ">{item?.pvNo}</td>
                    <td
                      className="border-y text-left truncate-25"
                      title={item?.fileLabelNumber}
                    >
                      {item?.fileLabelNumber}
                    </td>
                    <td className="border-y text-center truncate-25 ">
                      {formatDate(item?.paymentDate)}
                    </td>

                    <td
                      className="border-y text-right truncate-25"
                      title={item?.amountPaid}
                    >
                      {item?.amountPaid}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td className="border-y text-center py-2" colSpan="12">
                  <span className="text-red-500 font-extrabold text-[12px]">
                    No data found
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="max-h-[40vh] overflow-y-scroll w-[80%] mx-auto mt-8 card1 p-1">
        <label htmlFor="" className="font-semibold text-[13px] mb-2">
          SUPPLIANCE(S)
        </label>
        <table className="table-auto w-full bg-white text-[13px]">
          <thead className="sticky -top-1 bg-gray-100">
            <tr className="bg-gray-100">
              <th className="border border-gray-200 text-left ">ID</th>
              <th className="border border-gray-200  ">FLN</th>
              <th className="border border-gray-200  ">SRA DATE</th>
              <th className="border border-gray-200 text-left ">QUANTITY</th>
              <th className="border border-gray-200  ">RECEIPT BY</th>
            </tr>
          </thead>
          <tbody>
            {details?.suppliances &&
              details?.suppliances.length > 0 ? (
              details?.suppliances?.map(
                (item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td className="border-y text-left ">{itemIndex + 1}</td>
                    <td
                      className="border-y text-left "
                      title={item?.fileLabelNumber}
                    >
                      {item?.fileLabelNumber}
                    </td>
                    <td
                      className="border-y text-left truncate-25"
                      title={item?.sraDate}
                    >
                      {formatDate(item?.sraDate)}
                    </td>
                    <td className="border-y text-left truncate-25 ">
                      {item?.quantity}
                    </td>
                    <td
                      className="border-y text-left truncate-25"
                      title={item?.receiptBy}
                    >
                      {item?.receiptBy || "-"}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td className="border-y text-center py-2" colSpan="12">
                  <span className="text-red-500 font-extrabold text-[12px]">
                    No data found
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="max-h-[40vh] overflow-y-scroll w-[80%] mx-auto mt-8 card1 p-1">
        <label htmlFor="" className="font-semibold text-[13px] mb-2">
          SERVICE(S)
        </label>
        <table className="table-auto w-full bg-white text-[13px]">
          <thead className="sticky -top-1 bg-gray-100">
            <tr className="bg-gray-100">
              <th className="border border-gray-200 text-left ">ID</th>
              <th className="border border-gray-200  ">
                CERTIFICATION OF COMPLETION DATE
              </th>
              <th className="border border-gray-200  ">FLN</th>
              <th className="border border-gray-200 text-center ">
                PERCENTAGE OF COMPLETION(%)
              </th>
              <th className="border border-gray-200  ">DESIGNATION</th>
            </tr>
          </thead>
          <tbody>
            {details?.services &&
              details?.services?.length > 0 ? (
              details?.services?.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td className="border-y text-left ">{itemIndex + 1}</td>
                  <td
                    className="border-y text-left truncate-25"
                    title={item?.certificationOfCompletionDate}
                  >
                    {formatDate(item?.certificationOfCompletionDate)}
                  </td>
                  <td
                    className="border-y text-left "
                    title={item?.fileLabelNumber}
                  >
                    {item?.fileLabelNumber}
                  </td>
                  <td
                    className="border-y text-left truncate-25"
                    title={item?.percentageOfCompletion}
                  >
                    {item?.percentageOfCompletion}
                  </td>
                  <td
                    className="border-y text-left truncate-25"
                    title={item?.designation}
                  >
                    {item?.designation}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border-y text-center py-2" colSpan="12">
                  <span className="text-red-500 font-extrabold text-[12px]">
                    No data found
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="max-h-[40vh] overflow-y-scroll w-[80%] mx-auto mt-8 card1 p-1">
        <label htmlFor="" className="font-semibold text-[13px] mb-2">
          CONTRACT(S)
        </label>
        <table className="table-auto w-full bg-white text-[13px]">
          <thead className="sticky -top-1 bg-gray-100">
            <tr className="bg-gray-100">
              <th className="border border-gray-200 text-left ">ID</th>
              <th className="border border-gray-200  ">CONTRACT DATE</th>
              <th className="border border-gray-200  ">CONTRACT NUMBER</th>
              <th className="border border-gray-200  ">ITEM TO BE SUPPLIED</th>
              <th className="border border-gray-200  ">
                QUANTITY
              </th>
              <th className="border border-gray-200 text-center ">
                UNIT PRICE
              </th>
              <th className="border border-gray-200  ">DATE OF DELIVERY</th>
              <th className="border border-gray-200  ">SIGNED BY</th>
              <th className="border border-gray-200  ">FILE LABEL NUMBER</th>
            </tr>
          </thead>
          <tbody>
            {details?.contracts &&
              details?.contracts?.length > 0 ? (
              details?.contracts?.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td className="border-y text-left ">{itemIndex + 1}</td>
                  <td
                    className="border-y text-left truncate-25"

                  >
                    {formatDate(item?.contractDate)}
                  </td>
                  <td
                    className="border-y text-left "
                    title={item?.contractNo}
                  >
                    {item?.contractNo}
                  </td>
                  <td
                    className="border-y text-left truncate-25"
                    title={item?.itemToBeSupplied}
                  >
                    {item?.itemToBeSupplied}
                  </td>
                  <td
                    className="border-y text-left truncate-25"
                    title={item?.quantity}
                  >
                    {item?.quantity}
                  </td>
                  <td
                    className="border-y text-left truncate-25"
                    title={item?.unitPrice}
                  >
                    {item?.unitPrice}
                  </td>
                  <td
                    className="border-y text-left truncate-25"
                    title={item?.supplyBeforeDate}
                  >
                    {item?.supplyBeforeDate}
                  </td>
                  <td
                    className="border-y text-left truncate-25"
                    title={item?.contractSign}
                  >
                    {item?.contractSign}
                  </td>
                  <td
                    className="border-y text-left truncate-25"
                    title={item?.fileLabelNumber}
                  >
                    {item?.fileLabelNumber}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border-y text-center py-2" colSpan="12">
                  <span className="text-red-500 font-extrabold text-[12px]">
                    No data found
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewDetails;
