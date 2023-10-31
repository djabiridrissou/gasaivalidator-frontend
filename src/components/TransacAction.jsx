import React, { useEffect, useState } from "react";
import { useLocation, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../server/server";
import { useDispatch, useSelector } from "react-redux";
import { saveGifmisProcessed } from "../utils/saveGifmisProcessed";
import { addGifmisProcessed } from "../redux/features/gifmis-processed";

const TransactionDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const transaction = useSelector((state) => state.gifmis.transactions.find(e => e.id == id));
  
  const handleOnClose = (e) => {
    navigate("/dashboard/goods");
    window.location.reload();
  };
  const dispatch = useDispatch();

  let advancedPayment = useSelector((state) => state.form2.advancedPayment);
  let paymentStatus = useSelector((state) => state.form1.paymentStatus);
  let transactions1 = useSelector((state) => state.form1.transactions);
  let transactions2 = useSelector((state) => state.form2.transactions);
  let isJobDone = useSelector((state) => state.form1.isJobDone);

  let transactions = [
    {
      paymentDate: "",
      pvNo: "",
      amountPaid: "0",
      fileLabelNumber: "",
    },
  ];
  let fundingType = useSelector((state) => state.form3.fundingType);
  let financialYear = useSelector((state) => state.form3.financialYear);
  let availableBudget = useSelector((state) => state.form3.availableBudget);
  let warrantSupported = useSelector((state) => state.form3.warrantSupported);
  let warrantAmount = useSelector((state) => state.form3.warrantAmount);
  let warrantDate = useSelector((state) => state.form3.warrantDate);
  let warrantNo = useSelector((state) => state.form3.warrantNo);
  let fileLabelNumber = useSelector((state) => state.form3.fileLabelNumber);
  let budgetFileLabelNumber = useSelector((state) => state.form3.budgetFileLabelNumber);
  let donors = useSelector((state) => state.form3.donors);
  let expenditureType = useSelector((state) => state.form4.expenditureType);

  console.log("expenstate", expenditureType);
  let workType = useSelector((state) => state.form4.workType);
  let buildingType = useSelector((state) => state.form4.buildingType);
  let numberOfRooms = useSelector((state) => state.form4.numberOfRooms);
  let description = useSelector((state) => state.form4.description);
  let availableContracts = useSelector((state) => state.form4.availableContracts);
  let availableJudgement = useSelector((state) => state.form4.availableJudgement);
  let compensationType = useSelector((state) => state.form4.compensationType);
  let judgements = useSelector((state) => state.form4.judgements);
  let contracts;
  let goodsContracts = useSelector((state) => state.form4.goodsContracts);
  let servicesContracts = useSelector((state) => state.form4.servicesContracts);
  let worksContracts = useSelector((state) => state.form4.worksContracts);
  let roadsContracts = useSelector((state) => state.form4.roadsContracts);
  if (expenditureType === "Goods") {
    contracts = goodsContracts;
  }
  if (expenditureType === "Services") {
    contracts = servicesContracts;
  }
  if (expenditureType === "Works") {
    if (workType == "Road" || workType == "Building") {
        contracts = roadsContracts;
    } else {
        contracts = worksContracts;
    }
  }


  let transactionInGIFMIS = useSelector((state) => state.form5.transactionInGIFMIS);
  let purchaseOrderNo = useSelector((state) => state.form5.purchaseOrderNo);
  let invoiceNo = useSelector((state) => state.form5.invoiceNo);
  let gifmisFileLabelNumber = useSelector((state) => state.form5.fileLabelNumber);
  let purchaseOrderNoToSave = "";
  let invoiceNoToSave = "";
  let gifmisFileLabelNumberToSave = "";
  let isItemSupplied = useSelector((state) => state.form6.isItemSupplied);

  let suppliances = useSelector((state) => state.form6.suppliances);
  let distributedFileLabelNumberToSave = "";
  let quantityDistributedToSave = "";
  let isServiceCompleted = useSelector((state) => state.form6.isServiceCompleted);
  let isWorkCompleted = useSelector((state) => state.form6.isWorkCompleted);
  let regionalLocation = useSelector((state) => state.form6.regionalLocation);
  let districtLocation = useSelector((state) => state.form6.districtLocation);
  let services = useSelector((state) => state.form6.services);
  let works = useSelector((state) => state.form6.works);
  let isItemDistributed = useSelector((state) => state.form7.isItemDistributed);
  let distributionFileLabelNumber = useSelector((state) => state.form7.fileLabelNumber);
  let quantityDistributed = useSelector((state) => state.form7.quantityDistributed);
  let availableInStore = useSelector((state) => state.form8.availableInStore);
  let anyAvailableInStore = useSelector((state) => state.form8.anyAvailableInStore);

  let quantitySendToStore = useSelector((state) => state.form8.quantitySendToStore);
  let sendQuantityFileLabelNumber = useSelector((state) => state.form8.fileLabelNumberSendToStore);
  let actualQuantityInStore = useSelector((state) => state.form8.quantityInStore);
  let storeFileLabelNumber = useSelector((state) => state.form8.fileLabelNumberInStore);
  let ipcSupported = useSelector((state) => state.form9.ipcSupported);
  let ipcDetails = useSelector((state) => state.form9.ipcDetails);
  if (paymentStatus === "fully paid") {
    transactions = transactions1;
    advancedPayment = false;
  } else if (paymentStatus === "partial payment" || paymentStatus === "unpaid") {
    transactions = transactions2;
  }

  const handleSave = () => {
    const data = {
      payment: paymentStatus,
      transactions: transactions,
      advancedpayment: advancedPayment,
      isjobdone: isJobDone,
      fundingtype: fundingType,
      financialyear: financialYear,
      availablebudget: availableBudget,
      budgetfilelabelnumber: budgetFileLabelNumber,
      warrantsupported: warrantSupported,
      warrantamount: warrantAmount,
      warrantdate: warrantDate,
      warrantno: warrantNo,
      warrantfilelabelnumber: fileLabelNumber,
      donors: donors,
      expendituretype: expenditureType,
      worktype: workType,
      buildingtype: buildingType,
      numberofrooms: numberOfRooms,
      description: description,
      availablecontracts: availableContracts,
      availablejudgement: availableJudgement,
      compensationtype: compensationType,
      judgements: judgements,
      contracts: contracts, // cc
      transactioningifmis: transactionInGIFMIS,
      purchaseorderno: purchaseOrderNo,
      invoiceno: invoiceNo,
      gifmisfilelabelnumber: gifmisFileLabelNumber,
      isitemsupplied: isItemSupplied,
      suppliances: suppliances,
      isservicecompleted: isServiceCompleted,
      isworkcompleted: isWorkCompleted,
      regionallocation: regionalLocation,
      districtlocation: districtLocation,
      services: services,
      works: works,
      isitemdistributed: isItemDistributed,
      distributedfilelabelnumber: distributionFileLabelNumber,
      quantitydistributed: quantityDistributed,
      availableinstore: availableInStore,
      anyavailableinstore: anyAvailableInStore,
      quantitysendtostore: quantitySendToStore,
      qtysendfilelabelnumber: sendQuantityFileLabelNumber,
      actualquantityinstore: actualQuantityInStore,
      storefilelabelnumber: storeFileLabelNumber,
      ipcsupported: ipcSupported,
      ipcdetails: ipcDetails,

    };

    const addGifmisProcessedDto = {
      data,
      id: transaction?.id
    };

    console.log(addGifmisProcessedDto);

    dispatch(addGifmisProcessed(addGifmisProcessedDto)).unwrap().then((res) => {
      if (res.status == 200) {
        console.log("Handle success");
      } else {
        console.log("Handle error");
        console.log("error", res);
      }
    }).catch(error => {
      console.log("Handle error");
      console.log("catcherror", error);
    });

    // console.log("contracts", contracts);
    navigate("/dashboard/goods");
    window.location.reload();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 flex flex-col w-[90%] h-4/5 overflow-auto">
        <button
          className="absolute top-6 right-4 text-red-500 text-2xl border rounded-full"
          onClick={handleOnClose}
        >
          <span role="img" aria-label="Fermer">
            ❌
          </span>
        </button>

        <h2 className="text-xl font-bold text-center mb-4">
          {transaction?.vendorname}
        </h2>
        <div className="flex justify-center">
          <div className="flex flex-col space-y-4 mr-4">
          <div className="">
              <p className="font-bold text-xs">
                REVISED CONTRACT AMOUNT:
              <span className="font-normal"> {(transaction?.revisedcontractamount)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </p>
            </div>
            <div className="">
              <p className="font-bold text-xs">
                ORGNAME:
                <span className="font-normal"> {transaction?.orgname}</span>
              </p>
            </div>
           

            <div className="">
              <p className="font-bold text-xs">
                DESCRIPTION:
                <span className="font-normal text-[9px]">
                  {" "}
                  {transaction?.description}
                </span>
              </p>
            </div>
           {/*  <div className="">
              <p className="font-bold text-xs">
                AMOUNT PAID:
                <span className="font-normal">{(transaction?.amountpaid).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </span>
              </p>
            </div> */}
          </div>
          <div className="flex flex-col space-y-4 mr-8">
            <div className="">
              <p className="font-bold text-xs">
                OUTSTANDING CLAIM:
                <span className=" text-xs font-normal">
                  {transaction?.outstandingclaim?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr className="border-t-green-600  mt-4" />
        <div>
          <Outlet />
        </div>
        <div className="flex justify-center">
          <button
            className="font-medium bg-green-600 text-white px-[4rem] py-[0.25rem] mt-12  justify-center rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
