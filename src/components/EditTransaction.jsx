import React, { useEffect, useState } from "react";
import { useLocation, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../server/server";
import { useDispatch, useSelector } from "react-redux";
import { saveGifmisProcessed } from "../utils/saveGifmisProcessed";
import { updateGifmisProcessed } from "../redux/features/gifmis-processed";
import { getAllGifmisProcessed } from "../redux/features/gifmis-processed";
import { toast } from 'react-toastify';


const EditTransaction = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const transactionsCheck = useSelector((state) => state.gifmisProcessed.gifmisProcessed);
  const gifmisProcessed = (useSelector((state) => state.gifmisProcessed.gifmisProcessed?.find(e => e.id == id)));
  //console.log("gifmisProcessed", gifmisProcessed);
  useEffect(() => {
    if (transactionsCheck.length === 0) {
      navigate("/dashboard/gifmisprocessed");
    }
  }, [transactionsCheck]);

 


  const dispatch = useDispatch();
  //console.log("gifmisProcessed payment", gifmisProcessed?.payment);


  let advancedPayment = useSelector((state) => state.form2.advancedPayment);
  let paymentStatus = useSelector((state) => state.form1.paymentStatus);
  let transactions1 = useSelector((state) => state.form1.transactions);
  let transactions2 = useSelector((state) => state.form2.transactions);
  let isJobDone = useSelector((state) => state.form1.isJobDone);

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
  if (expenditureType === "Service") {
    contracts = servicesContracts;
  }
  if (expenditureType === "Works") {
    if (workType == "Road" || workType == "Building" || workType == "Sea Defence & Drainage") {
      contracts = roadsContracts;
    } else {
      contracts = worksContracts;
    }
  }

  let transactionInGIFMIS = useSelector((state) => state.form5.transactionInGIFMIS);
  let purchaseOrderNo = useSelector((state) => state.form5.purchaseOrderNo);
  let invoiceNo = useSelector((state) => state.form5.invoiceNo);
  let invoiceDate = useSelector((state) => state.form5.invoiceDate);
  let gifmisFileLabelNumber = useSelector((state) => state.form5.fileLabelNumber);
  let isItemSupplied = useSelector((state) => state.form6.isItemSupplied);
  let suppliances = useSelector((state) => state.form6.suppliances);
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
  let availableBta = useSelector((state) => state.form11.availableBta);
  let btaAmount = useSelector((state) => state.form11.btaAmount);
  let btaDate = useSelector((state) => state.form11.btaDate);
  let btaReferenceNumber = useSelector((state) => state.form11.btaReferenceNumber);
  let onPremise = useSelector((state) => state.form10.onPremise);
  let auditorSatisfy = useSelector((state) => state.form10.auditorSatisfy);
  let auditorDetails = useSelector((state) => state.form10.auditorDetails);
  let btaDetails = useSelector((state) => state.form11.btaDetails);
  /*   if (paymentStatus === "fully paid") {
      transactions = transactions1;
      advancedPayment = false;
    } else if (paymentStatus === "partial payment" || paymentStatus === "unpaid") {
      transactions = transactions2;
    }
   */
  let transactions = useSelector((state) => state.form2.transactions);
  const handleEdit = () => {
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
      contracts: contracts,
      transactioningifmis: transactionInGIFMIS,
      purchaseorderno: purchaseOrderNo,
      invoiceno: invoiceNo,
      invoicedate: invoiceDate,
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
      availablebta: availableBta,
      btadetails: btaDetails,
      onpremise: onPremise,
      auditorsatisfy: auditorSatisfy,
      auditordetails: auditorDetails
    };

    const updateGifmisProcessedDto = {
      data,
    };

    dispatch(updateGifmisProcessed({ updateGifmisProcessedDto, id: gifmisProcessed.id })).unwrap().then((res) => {
      if (res.status == 200) {
        console.log("Handle success");
        toast.success("Update Done successfully!");
        navigate("/dashboard/gifmisprocessed");
        window.location.reload();

      } else {
        console.log("Handle error");
        console.log("error", res);
        toast.error("Something went wrong!");
      }
    }).catch(error => {
      console.log("Handle error");
      console.log("catcherror", error);
      toast.error("Something went wrong!");
    });


  }

  const handleOnClose = (e) => {
    navigate("/dashboard/gifmisprocessed");
    window.location.reload();
  };
  //console.log("trans", useSelector((state) => state.form1Edit.transactions));

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
          {gifmisProcessed?.gifmis.vendorname}
        </h2>
        <div className="flex justify-center">
          <div className="flex flex-col space-y-4 mr-4">
            <div className="">
              <p className="font-bold text-xs">
                REVISED CONTRACT AMOUNT:
                <span className="font-normal"> {(gifmisProcessed?.gifmis?.revisedcontractamount)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </p>
            </div>
            <div className="">
              <p className="font-bold text-xs">
                ORGNAME:
                <span className="font-normal"> {gifmisProcessed?.gifmis?.orgname}</span>
              </p>
            </div>


            <div className="">
              <p className="font-bold text-xs">
                DESCRIPTION:
                <span className="font-normal text-[9px]">
                  {" "}
                  {gifmisProcessed?.gifmis?.description}
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
                  {gifmisProcessed?.gifmis?.outstandingclaim?.toLocaleString(undefined, {
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
            className="font-medium bg-yellow-600 text-white px-[4rem] py-[0.25rem] mt-12  justify-center rounded"
            onClick={handleEdit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTransaction;
