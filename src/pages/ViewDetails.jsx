import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server/server";
import {
  formatDate,
  formatFinancialNumber,
} from "../functions/helperFunctions";

const ViewDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${server}/gifmisprocessed/${id}`);
      console.log(response.data);
      setDetails(response.data);
    };
    getData();
  }, []);
  return (
    <>
      <h1 className="text-center font-semibold">
        {details?.transaction.vendorname}
      </h1>
      <div className="w-[98.5%] mx-auto  flex justify-evenly  text-[13px] mt-2 p-2">
        {/* left */}
        <section className="space-y-3">
          <p>
            <span className="font-semibold">ORGNAME:</span>{" "}
            {details?.transaction?.orgname}
          </p>
          <p>
            <span className="font-semibold">INVOICE NUMBER:</span>{" "}
            {details?.transaction?.invoiceno}
          </p>
          <p>
            <span className="font-semibold">DESCRIPTION:</span>{" "}
            {details?.transaction?.description}
          </p>
          <p>
            <span className="font-semibold">EXP TYPE:</span>{" "}
            {details?.transaction?.orgname}
          </p>
          <p>
            <span className="font-semibold">INV GROSS AMOUNT:</span>{" "}
            {formatFinancialNumber(
              Number(details?.transaction?.invgrossamount)
            )}
          </p>

          <p>
            <span className="font-semibold">BALANCE TO BE PAID:</span>{" "}
            {formatFinancialNumber(
              Number(details?.transactionDetails?.balancetobepaid)
            )}
          </p>

          <p>
            <span className="font-semibold">FILE LABEL NO:</span>{" "}
            {details?.transactionDetails?.transactions[0]?.filelabelnumber}
          </p>

          <p>
            <span className="font-semibold">INV PAYMENT STATUS:</span>{" "}
            {details?.transaction.payment}
          </p>

          <p>
            <span className="font-semibold">ADVANCED PAYMENT:</span>{" "}
            {details?.transaction?.advancedpayment === "true" ? "Yes" : "No"}
          </p>

          <p>
            <span className="font-semibold">FUNDING TYPE:</span>{" "}
            {details?.transaction?.fundingtype}
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
            {details?.transaction?.warrantsupported === "true" ? "Yes" : "No"}
          </p>

          <p>
            <span className="font-semibold">WARRANT DATE:</span>{" "}
            {formatDate(details?.transaction?.warrantdate)}
          </p>

          <p>
            <span className="font-semibold">WARRANT NO:</span>{" "}
            {details?.transaction?.warrantno}
          </p>

          <p>
            <span className="font-semibold">WARRANT FILE LABEL NO:</span>{" "}
            {details?.transaction?.warrantfilelabelnumber}
          </p>

          <p>
            <span className="font-semibold">WARRANT AMOUNT:</span>{" "}
            {formatFinancialNumber(Number(details?.transaction?.warrantamount))}{" "}
          </p>

          <p>
            <span className="font-semibold">EXPENDITURE TYPE:</span>{" "}
            {details?.transaction?.expendituretype}
          </p>

          <p>
            <span className="font-semibold">AVAIBLE CONTRACT:</span>{" "}
            {details?.transaction?.availablecontracts === "true" ? "Yes" : "No"}
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
                      {formatDate(item?.paymentdate)}
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
            {details?.transactionDetails?.transactions &&
            details?.transactionDetails?.suppliances.length > 0 ? (
              details?.transactionDetails?.suppliances?.map(
                (item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td className="border-y text-left ">{itemIndex + 1}</td>
                    <td
                      className="border-y text-left "
                      title={item?.filelabelnumber}
                    >
                      {item?.filelabelnumber}
                    </td>
                    <td
                      className="border-y text-left truncate-25"
                      title={item?.sradate}
                    >
                      {formatDate(item?.sradate)}
                    </td>
                    <td className="border-y text-left truncate-25 ">
                      {item?.quantity}
                    </td>
                    <td
                      className="border-y text-left truncate-25"
                      title={item?.receiptby}
                    >
                      {item?.receiptby}
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
            </tr>
          </thead>
          <tbody>
            {details?.transactionDetails?.services &&
            details?.transactionDetails?.services.length > 0 ? (
              details?.transactionDetails?.services?.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td className="border-y text-left ">{itemIndex + 1}</td>
                  <td
                    className="border-y text-left truncate-25"
                    title={item?.certificationofcompletiondate}
                  >
                    {formatDate(item?.certificationofcompletiondate)}
                  </td>
                  <td
                    className="border-y text-left "
                    title={item?.filelabelnumber}
                  >
                    {item?.filelabelnumber}
                  </td>
                  <td
                    className="border-y text-left truncate-25"
                    title={item?.percentageofcompletion}
                  >
                    {item?.percentageofcompletion}
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
