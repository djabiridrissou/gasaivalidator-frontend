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
import { getSoa } from "../redux/features/gifmis";
import { truncateString } from "../functions/helperFunctions";

const ViewDetails = ({ transaction }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const transactions = useSelector((state) => state.gifmisProcessed.gifmisProcessed);
  const soa = useSelector((state) => state.gifmis.soa);



  const details = (transactions?.find(e => e?.id == parseInt(id)));
  console.log("details", details);

  /* console.log("toShow", toShow);
      const details = toShow?.gifmisProcesseds[0];
    console.log("details", details); */
  useEffect(() => {
    /* console.log("view length transactions", transactions?.length);
    console.log("view length soa", soa);
    console.log("view id", id); */
    /* if (transactions) {
      setDetails(transactions.find(e => e?.id == id));
    } 
    if (soa) {
      
    } */
    //setDetails(soa.find(e => e?.id === id));
    if (!details) {
      navigate("/dashboard/gifmisprocessed");
    }

  }, [transactions, soa]);

  /* 
    console.log("details", details) */
 
  return (
    <>
      <div className="overflow-auto">
        <h1 className="text-center font-bold text-3xl">
          {details?.gifmis?.vendorname}
        </h1>
        <div className="w-[98.5%] mx-auto  flex justify-evenly  text-[13px] mt-2 p-2">
          {/* left */}
          <section className="space-y-3">
            <p>
              <span className="font-semibold">INV PAYMENT STATUS:</span>{" "}
              {details?.payment === "" ? "-" : details?.payment}
            </p>
            <p>
              <span className="font-semibold">ADVANCED PAYMENT:</span>{" "}
              {details?.advancedpayment === true ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">FUNDING TYPE:</span>{" "}
              {details?.fundingtype === "" ? "-" : details?.fundingtype}
            </p>
            {
              details?.fundingtype == "Central government" && (
                <>
                  <p>
                    <span className="font-semibold">WARRANT SUPPORTED:</span>{" "}
                    {details?.warrantsupported === true ? "Yes" : "No"}
                  </p>
                  {details?.warrantsupported === true && (
                    <>
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
                    </>
                  )}
                  <p>
                    <span className="font-semibold">AVAIBLE BTA:</span>{" "}
                    {details?.availablebta === true ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="font-semibold">TRANSACTION IN GIFMIS:</span>{" "}
                    {details?.transactioningifmis === true ? "Yes" : "No"}
                  </p>
                  {details?.transactioningifmis === true && (
                    <>
                      <p>
                        <span className="font-semibold">PURCHASE ORDER NUMBER:</span>{" "}
                        {details?.purchaseorderno}
                      </p>
                      <p>
                        <span className="font-semibold">INVOICE NUMBER:</span>{" "}
                        {details?.invoiceno}
                      </p>
                      <p>
                        <span className="font-semibold">INVOICE DATE:</span>{" "}
                        {details?.invoicedate}
                      </p>
                      <p>
                        <span className="font-semibold">GIFMIS FILE LABEL NUMBER:</span>{" "}
                        {details?.gifmisfilelabelnumber}
                      </p>
                    </>
                  )}
                  <p>
                    <span className="font-semibold">AVAIBLE CONTRACTS:</span>{" "}
                    {details?.availablecontracts === true ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="font-semibold">EXPENDITURE TYPE:</span>{" "}
                    {details?.expendituretype === "" ? "-" : details?.expendituretype}
                  </p>
                  {details?.expendituretype === "Goods" && (
                    <>
                      <p>
                        <span className="font-semibold">IS THE ITEM SUPPLIED ?</span>{" "}
                        {details?.isitemsupplied === true ? "Yes" : "No"}
                      </p>
                      {details.isitemsupplied === true && (
                        <>
                          <p>
                            <span className="font-semibold">IS THE ITEM DISTRIBUTED ?</span>{" "}
                            {details?.isitemdistributed === true ? "Yes" : "No"}
                          </p>

                          {details.isitemdistributed === false && (
                            <>
                              <p>
                                <span className="font-semibold">ITEM AVAILABLE IN STORE:</span>{" "}
                                {details?.availableinstore === true ? "Yes" : "No"}
                              </p>
                              {details.availableinstore === true && (
                                <>
                                  <p>
                                    <span className="font-semibold">QUANTITY IN STORE:</span>{" "}
                                    {details?.actualquantityinstore}
                                  </p>
                                  <p>
                                    <span className="font-semibold">STORE FILE LABEL NUMBER:</span>{" "}
                                    {details?.storefilelabelnumber}
                                  </p>
                                </>
                              )}
                            </>
                          )}
                          {details.isitemdistributed === true && (
                            <>
                              <p>
                                <span className="font-semibold">ANY AVAILABLE IN STORE:</span>{" "}
                                {details?.anyavailableinstore === true ? "Yes" : "No"}
                              </p>
                              {details?.anyavailableinstore === true && (
                                <>
                                  <p>
                                    <span className="font-semibold">QUANTITY IN STORE:</span>{" "}
                                    {details?.quantitysendtostore}
                                  </p>
                                  <p>
                                    <span className="font-semibold">STORE FILE LABEL NUMBER:</span>{" "}
                                    {details?.qtysendfilelabelnumber}
                                  </p>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {details?.expendituretype === "Service" && (
                    <>
                      <p>
                        <span className="font-semibold">IS SERVICE COMPLETED ?</span>{" "}
                        {details?.isservicecompleted === true ? "Yes" : "No"}
                      </p>
                      {details.isservicecompleted === true && (
                        <>
                          <p>
                            <span className="font-semibold">REGIONAL LOCATION:</span>{" "}
                            {details?.regionallocation}
                          </p>
                          <p>
                            <span className="font-semibold">DISTRICT LOCATION:</span>{" "}
                            {details?.districtlocation}
                          </p>
                          <p>
                            <span className="font-semibold">ON PREMISE ?</span>{" "}
                            {details?.onpremise === true ? "Yes" : "No"}
                          </p>
                          {details?.onpremise === true && (
                            <>
                              <p>
                                <span className="font-semibold">IS AUDITOR SATISFY ?</span>{" "}
                                {details?.auditorsatisfy === true ? "Yes" : "No"}
                              </p>
                              {details?.auditorsatisfy === false && (
                                <p>
                                  <span className="font-semibold">AUDITOR DETAILS:</span>{" "}
                                  {details?.auditordetails}
                                </p>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {details?.expendituretype === "Works" && (
                    <>
                      <p>
                        <span className="font-semibold">WORK TYPE:</span>{" "}
                        {details?.worktype}
                      </p>
                      {details?.worktype === "Building" && (
                        <>
                          <p>
                            <span className="font-semibold">NUMBER OF ROOMS:</span>{" "}
                            {details?.numberofrooms}
                          </p>

                        </>
                      )}
                      <p>
                        <span className="font-semibold">AVAILABLE IPC ?</span>{" "}
                        {details?.ipcsupported === true ? "Yes" : "No"}
                      </p>
                      <p>
                        <span className="font-semibold">REGIONAL LOCATION:</span>{" "}
                        {details?.regionallocation}
                      </p>
                      <p>
                        <span className="font-semibold">DISTRICT LOCATION:</span>{" "}
                        {details?.districtlocation}
                      </p>
                      <p>
                        <span className="font-semibold">WORK COMPLETED ?</span>{" "}
                        {details?.isworkcompleted === true ? "Yes" : "No"}
                      </p>
                    </>
                  )}
                </>
              )
            }
            {
              details?.fundingtype == "IGF" && (
                <>
                  <p>
                    <span className="font-semibold">AVAILABLE BUDGET:</span>{" "}
                    {details?.availablebudget === true ? "Yes" : "No"}
                  </p>
                  {details?.availablebudget === true && (
                    <>
                      <p>
                        <span className="font-semibold">FINANCIAL YEAR:</span>{" "}
                        {details?.financialyear}
                      </p>
                      <p>
                        <span className="font-semibold">BUDGET FILE LABEL NUMBER:</span>{" "}
                        {details?.budgetfilelabelnumber}
                      </p>
                    </>
                  )}
                </>
              )
            }
            {
              details?.fundingtype == "Donor" && (
                <>
                  <p>
                    <span className="font-semibold">AVAILABLE BUDGET:</span>{" "}
                    {details?.availablebudget === true ? "Yes" : "No"}
                  </p>
                  {details?.availablebudget === true && (
                    <>
                      <p>
                        <span className="font-semibold">FINANCIAL YEAR:</span>{" "}
                        {details?.financialyear}
                      </p>
                      <p>
                        <span className="font-semibold">BUDGET FILE LABEL NUMBER:</span>{" "}
                        {details?.budgetfilelabelnumber}
                      </p>
                    </>
                  )}
                </>
              )
            }
          </section>

          {/* right */}
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
              <span
                className="truncate-text cursor-pointer"
                title={details?.gifmis?.description}
              >
                {truncateString(details?.gifmis?.description, 55)}
              </span>
            </p>

            <p>
              <span className="font-semibold">REVISED CONTRACT AMOUNT:</span>{" "}
              {((details?.gifmis?.revisedcontractamount))?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>


          </section>
        </div>
        {(details?.transactions)?.length > 0 && details?.payment && (
          <div className="max-h-[40vh] overflow-y-scroll w-[80%] mx-auto mt-4 card1 p-1">
            <label htmlFor="" className="font-semibold text-[13px] mb-2">
              TRANSACTION(S)
            </label>
            <table className="table-auto w-full bg-white text-[13px]">
              <thead className="sticky -top-1 bg-gray-100">
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 text-left ">ID</th>
                  <th className="border border-gray-200 text-left ">PV NO</th>
                  <th className="border border-gray-200 text-left">FLN</th>
                  <th className="border border-gray-200 text-left">PAYMENT DATE</th>
                  <th className="border border-gray-200 text-left">AMOUNT PAID</th>
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
                        <td className="border-y text-left truncate-25 ">
                          {formatDate(item?.paymentDate)}
                        </td>

                        <td
                          className="border-y text-left truncate-25"
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
        )}

        {(details?.availablecontracts && details?.expendituretype === "Goods") && (
          <div className="max-h-[40vh] overflow-y-scroll w-[80%] mx-auto mt-8 card1 p-1">
            <label htmlFor="" className="font-semibold text-[13px] mb-2">
              CONTRACT(S)
            </label>
            <table className="table-auto w-full bg-white text-[13px]">
              <thead className="sticky -top-1 bg-gray-100">
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 text-left ">ID</th>
                  <th className="border border-gray-200 text-left">CONTRACT DATE</th>
                  <th className="border border-gray-200 text-left">CONTRACT NUMBER</th>
                  <th className="border border-gray-200 text-left">ITEM TO BE SUPPLIED</th>
                  <th className="border border-gray-200 text-left">
                    QUANTITY
                  </th>
                  <th className="border border-gray-200 text-left ">
                    UNIT PRICE
                  </th>
                  <th className="border border-gray-200 text-left">DATE OF DELIVERY</th>
                  <th className="border border-gray-200 text-left">SIGNED BY</th>
                  <th className="border border-gray-200 text-left">FILE LABEL NUMBER</th>
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
                        {formatDate(item?.supplyBeforeDate)}
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
        )}

        {(details?.availablecontracts && details?.expendituretype === "Service") && (
          <div className="max-h-[40vh] overflow-y-scroll w-[80%] mx-auto mt-8 card1 p-1">
            <label htmlFor="" className="font-semibold text-[13px] mb-2">
              CONTRACT(S)
            </label>
            <table className="table-auto w-full bg-white text-[13px]">
              <thead className="sticky -top-1 bg-gray-100">
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 text-left ">ID</th>
                  <th className="border border-gray-200 text-left">CONTRACT DATE</th>
                  <th className="border border-gray-200 text-left">CONTRACT NUMBER</th>
                  <th className="border border-gray-200 text-left">CONTRACT AMOUNT</th>
                  <th className="border border-gray-200 text-left">SERVICE DESCRIPTION</th>
                  <th className="border border-gray-200 text-left">
                    DATE OF DELIVERY
                  </th>
                  <th className="border border-gray-200 text-left">SIGNED BY</th>
                  <th className="border border-gray-200 text-left">FILE LABEL NUMBER</th>
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
                        className="border-y text-left "
                        
                      >
                        {(item?.contractAmount)?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td
                        className="border-y text-left truncate-25"
                        title={item?.serviceDescription}
                      >
                        {item?.serviceDescription}
                      </td>
                      <td
                        className="border-y text-left"

                      >
                        {formatDate(item?.serviceToBeDeliveredBeforeDate)}
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
        )}

        {(details?.availablecontracts && details?.expendituretype === "Works" && (details?.worktype == "Road" || details?.worktype == "Building" || details?.worktype == "Sea Defence & Drainage")) && (
          <div className="max-h-[40vh] overflow-y-scroll w-[80%] mx-auto mt-8 card1 p-1">
            <label htmlFor="" className="font-semibold text-[13px] mb-2">
              CONTRACT(S)
            </label>
            <table className="table-auto w-full bg-white text-[13px]">
              <thead className="sticky -top-1 bg-gray-100">
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 text-left ">ID</th>
                  <th className="border border-gray-200 text-left">CONTRACT DATE</th>
                  <th className="border border-gray-200 text-left">CONTRACT NUMBER</th>
                  <th className="border border-gray-200 text-left">TOTAL KILOMETERS</th>
                  <th className="border border-gray-200 text-left">SIGNED BY</th>
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
                        className="border-y text-left truncate-25" title={item?.totalKilometers}>
                        {item?.totalKilometers}
                      </td>
                      <td
                        className="border-y text-left truncate-25"
                        title={item?.contractSign}
                      >
                        {item?.contractSign}
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
        )}

        {(details?.availablecontracts && details?.expendituretype === "Works" && details?.worktype != "Road" && details?.worktype != "Building" && details?.worktype != "Sea Defence & Drainage") && (
          <div className="max-h-[40vh] overflow-y-scroll w-[80%] mx-auto mt-8 card1 p-1">
            <label htmlFor="" className="font-semibold text-[13px] mb-2">
              CONTRACT(S)
            </label>
            <table className="table-auto w-full bg-white text-[13px]">
              <thead className="sticky -top-1 bg-gray-100">
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 text-left ">ID</th>
                  <th className="border border-gray-200 text-left">CONTRACT DATE</th>
                  <th className="border border-gray-200 text-left">CONTRACT NUMBER</th>
                  <th className="border border-gray-200 text-left">DESCRIPTION</th>
                  <th className="border border-gray-200 text-left">DELIVERY DATE</th>
                  <th className="border border-gray-200 text-left">FILE LABEL NUMBER</th>
                  <th className="border border-gray-200 text-left">SIGNED BY</th>
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
                        className="border-y text-left truncate-25" title={item?.workDescription}
                      >
                        {item?.workDescription}
                      </td>
                      <td
                        className="border-y text-left"
                      >
                        {formatDate(item?.workToBeDeliveredBeforeDate)}
                      </td>
                      <td
                        className="border-y text-left"
                      >
                        {item?.fileLabelNumber}
                      </td>
                      <td
                        className="border-y text-left truncate-25"
                        title={item?.contractSign}
                      >
                        {item?.contractSign}
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
        )}

        {details?.availablebta && (
          <>
            <div className="max-h-[40vh] overflow-y-scroll w-[80%] mx-auto mt-4 card1 p-1">
              <label htmlFor="" className="font-semibold text-[13px] mb-2">
                BTA(S)
              </label>
              <table className="table-auto w-full bg-white text-[13px]">
                <thead className="sticky -top-1 bg-gray-100">
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 text-left ">ID</th>
                    <th className="border border-gray-200 text-left ">BTA AMOUNT</th>
                    <th className="border border-gray-200 text-left">REFERENCE NUMBER</th>
                    <th className="border border-gray-200 text-left">BTA DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    details?.btadetails?.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td className="border-y text-left ">{itemIndex + 1}</td>
                        <td className="border-y text-left ">{(item?.btaAmount)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="border-y text-left truncate-25" title={item?.btaReferenceNumber}>
                          {item?.btaReferenceNumber}
                        </td>
                        <td className="border-y text-left truncate-25 ">
                          {formatDate(item?.btaDate)}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </>
        )}

        {details?.fundingtype == "Donor" && (
          <>
            <div className="max-h-[40vh] overflow-y-scroll w-[80%] mx-auto mt-4 card1 p-1">
              <label htmlFor="" className="font-semibold text-[13px] mb-2">
                DONOR(S)
              </label>
              <table className="table-auto w-full bg-white text-[13px]">
                <thead className="sticky -top-1 bg-gray-100">
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 text-left ">ID</th>
                    <th className="border border-gray-200 text-left ">DONOR NAME</th>
                    <th className="border border-gray-200 text-left">PLEDGE AMOUNT</th>
                    <th className="border border-gray-200 text-left">FLN</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    details?.donors?.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td className="border-y text-left ">{itemIndex + 1}</td>
                        <td className="border-y text-left truncate-25" title={item?.donorName}>
                          {item?.donorName}
                        </td>
                        <td className="border-y text-left ">{(item?.pledgeAmount)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="border-y text-left truncate-25" title={item?.fileLabelNumber}>
                          {item?.fileLabelNumber}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </>
        )}

        {(details?.expendituretype == "Works" && details?.ipcsupported) && (
          <>
            <div className="max-h-[40vh] overflow-y-scroll w-[80%] mx-auto mt-4 card1 p-1">
              <label htmlFor="" className="font-semibold text-[13px] mb-2">
                IPC
              </label>
              <table className="table-auto w-full bg-white text-[13px]">
                <thead className="sticky -top-1 bg-gray-100">
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 text-left ">ID</th>
                    <th className="border border-gray-200 text-left ">IPC NUMBER</th>
                    <th className="border border-gray-200 text-left">IPC AMOUNT</th>
                    <th className="border border-gray-200 text-left">IPC DATE</th>
                    <th className="border border-gray-200 text-left">FLN</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    details?.ipcdetails?.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td className="border-y text-left ">{itemIndex + 1}</td>
                        <td className="border-y text-left truncate-25" title={item?.ipcNumber}>
                          {item?.ipcNumber}
                        </td>
                        <td className="border-y text-left ">{(item?.ipcAmount)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="border-y text-left">
                          {formatDate(item?.ipcDate)}
                        </td>
                        <td className="border-y text-left">
                          {item?.fileLabelNumber}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </>
        )}

        {details?.isitemsupplied === true && (
          <div className="max-h-[40vh] overflow-y-scroll w-[80%] mx-auto mt-8 card1 p-1">
            <label htmlFor="" className="font-semibold text-[13px] mb-2">
              SUPPLIANCE(S)
            </label>
            <table className="table-auto w-full bg-white text-[13px]">
              <thead className="sticky -top-1 bg-gray-100">
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 text-left ">ID</th>
                  <th className="border border-gray-200  text-left">FLN</th>
                  <th className="border border-gray-200  text-left">SRA DATE</th>
                  <th className="border border-gray-200 text-left ">QUANTITY</th>
                  <th className="border border-gray-200  text-left">RECEIPT BY</th>
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
        )}

        {details?.isservicecompleted && details?.expendituretype == "Service" && (
          <div className="max-h-[40vh] overflow-y-scroll w-[80%] mx-auto mt-8 card1 p-1">
            <label htmlFor="" className="font-semibold text-[13px] mb-2">
              SERVICE(S)
            </label>
            <table className="table-auto w-full bg-white text-[13px]">
              <thead className="sticky -top-1 bg-gray-100">
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 text-left ">ID</th>
                  <th className="border border-gray-200  text-left">
                    CERTIFICATION OF COMPLETION DATE
                  </th>
                  <th className="border border-gray-200  text-left">FLN</th>
                  <th className="border border-gray-200 text-left ">
                    PERCENTAGE OF COMPLETION(%)
                  </th>
                  <th className="border border-gray-200  text-left">DESIGNATION</th>
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
        )}

        {details?.isworkcompleted && (
          <div className="max-h-[40vh] overflow-y-scroll w-[80%] mx-auto mt-4 card1 p-1">
            <label htmlFor="" className="font-semibold text-[13px] mb-2">
              WORK(S)
            </label>
            <table className="table-auto w-full bg-white text-[13px]">
              <thead className="sticky -top-1 bg-gray-100">
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 text-left ">ID</th>
                  <th className="border border-gray-200 text-left ">CERTIFICATION ISSUED BY</th>
                  <th className="border border-gray-200 text-left">COMPLETION DATE</th>
                  <th className="border border-gray-200 text-left">DESIGNATION</th>
                  <th className="border border-gray-200 text-left">PERCENTAGE OF COMPLETION</th>
                  <th className="border border-gray-200 text-left">FLN</th>
                </tr>
              </thead>
              <tbody>
                {
                  details?.works?.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td className="border-y text-left">{itemIndex + 1}</td>
                      <td className="border-y text-left">{item?.certificationIssuedBy}</td>
                      <td className="border-y text-left">
                        {formatDate(item?.certificationOfCompletionDate)}
                      </td>
                      <td className="border-y text-left">{item?.designation}</td>
                      <td className="border-y text-left">{item?.percentageOfCompletion}</td>
                      <td className="border-y text-left">{item?.fileLabelNumber}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewDetails;
