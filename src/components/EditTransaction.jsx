import React, { useEffect, useState } from "react";
import { useLocation, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../server/server";
import {useSelector, useDispatch } from "react-redux";
import {
  setPaymentStatus,
  setTransactions,
  setIsJobDone,
} from "../redux/features/form1Slice";
import {
  setTransactions2,
  setAdvancedPayment,
} from "../redux/features/form2Slice";
import {
  setFundingType,
  setFinancialYear,
  setWarrantSupported,
  setAvailableBudget,
  setWarrantDate,
  setWarrantNo,
  setWarrantAmount,
  setFileLabelNumber,
  setBudgetFileLabelNumber,
  setDonors,
} from "../redux/features/Form3Slice";
import {
  setExpenditureType,
  setWorkType,
  setBuildingType,
  setNumberOfRooms,
  setDescription,
  setAvailableContracts,
  setAvailableJudgement,
  setCompensationType,
  setJudgements,
  setGoodsContracts,
  setServicesContracts,
  setWorksContracts,
  setRoadsContracts,
} from "../redux/features/form4Slice";
import {
  setTransactionInGifmis,
  setPurchaseOrderNo,
  setInvoiceNo,
  setFileLabelNumberGifmis,
  setInvoiceDate,
} from "../redux/features/form5Slice";
import {
  setIsItemSupplied,
  setIsServiceCompleted,
  setIsWorkCompleted,
  setRegionalLocation,
  setDistrictLocation,
  setSuppliances, 
  setServices, 
  setWorks,
} from "../redux/features/form6Slice";
import {
  setFileLabelNumberDistributed,
  setIsItemDistributed,
  setQuantityDistributed,
} from "../redux/features/form7Slice";
import {
  setAvailableInStore,
  setAnyAvailableInStore,
  setStoreFileLabelNumber,
  setQuantityInStore,
  setFileLabelNumber1,
  setQuantityInStore1,
} from "../redux/features/form8Slice";
import {
  setIpcSupported,
  setIpcDetails,
} from "../redux/features/form9Slice";
import { updateGifmisProcessed } from "../utils/saveGifmisProcessed";

const EditTransaction = () => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const gifmisProcessed = useSelector((state) => state.gifmisProcessed.gifmisProcessed.find(e => e.id == id));


  const handleOnClose = (e) => {
    navigate("/dashboard/gifmisprocessed");
    window.location.reload();
  };

 
    if (gifmisProcessed?.expenditureType === "Goods") {
      dispatch(setGoodsContracts(gifmisProcessed?.contracts));
    }

    if (gifmisProcessed?.expenditureType === "Services") {
      dispatch(setServicesContracts(gifmisProcessed?.contracts));
    }
    if (gifmisProcessed.expenditureType === "Works") {
      dispatch(setWorksContracts(gifmisProcessed?.contracts));
    }
    if (gifmisProcessed.expenditureType === "Roads") {
      dispatch(setRoadsContracts(gifmisProcessed?.contracts));
    }

    if (gifmisProcessed?.payment === "fully paid") {
      dispatch(setTransactions(gifmisProcessed?.transactions));
    } else {
      dispatch(setTransactions2(gifmisProcessed?.transactions));
    }   
    dispatch(setPaymentStatus(gifmisProcessed?.payment));
    dispatch(setAdvancedPayment(gifmisProcessed?.advancedpayment));
    dispatch(setIsJobDone(gifmisProcessed?.isjobdone));
    dispatch(setFundingType(gifmisProcessed?.fundingtype));
    dispatch(setFinancialYear(gifmisProcessed?.financialyear));
    dispatch(setAvailableBudget(gifmisProcessed?.availablebudget));
    dispatch(setBudgetFileLabelNumber(gifmisProcessed?.budgetfilelabelnumber));
    dispatch(setWarrantSupported(gifmisProcessed?.warrantsupported));
    dispatch(setWarrantAmount(gifmisProcessed?.warrantamount));
    dispatch(setWarrantDate(gifmisProcessed?.warrantdate));
    dispatch(setWarrantNo(gifmisProcessed?.warrantno));
    dispatch(setFileLabelNumber(gifmisProcessed?.warrantfilelabelnumber));
    dispatch(setDonors(gifmisProcessed?.donors));
    dispatch(setExpenditureType(gifmisProcessed?.expendituretype));
    dispatch(setWorkType(gifmisProcessed?.worktype));
    dispatch(setBuildingType(gifmisProcessed?.buildingtype));
    dispatch(setNumberOfRooms(gifmisProcessed?.numberofrooms));
    dispatch(setDescription(gifmisProcessed?.description));
    dispatch(setAvailableContracts(gifmisProcessed?.availablecontracts));
    dispatch(setAvailableJudgement(gifmisProcessed?.availablejudgement));
    dispatch(setCompensationType(gifmisProcessed?.compensationtype));
    dispatch(setJudgements(gifmisProcessed?.judgements));
    dispatch(setTransactionInGifmis(gifmisProcessed?.transactioningifmis));
    dispatch(setPurchaseOrderNo(gifmisProcessed?.purchaseorderno));
    dispatch(setInvoiceNo(gifmisProcessed?.invoiceno));
    dispatch(setInvoiceDate(gifmisProcessed?.invoicedate));
    dispatch(setFileLabelNumberGifmis(gifmisProcessed?.gifmisfilelabelnumber));
    dispatch(setIsItemSupplied(gifmisProcessed?.isitemsupplied));
    dispatch(setSuppliances(gifmisProcessed?.suppliances));
    dispatch(setIsServiceCompleted(gifmisProcessed?.isservicecompleted));
    dispatch(setIsWorkCompleted(gifmisProcessed?.isworkcompleted));
    dispatch(setRegionalLocation(gifmisProcessed?.regionallocation));
    dispatch(setDistrictLocation(gifmisProcessed?.districtlocation));
    dispatch(setServices(gifmisProcessed?.services));
    dispatch(setWorks(gifmisProcessed?.works));
    dispatch(setIsItemDistributed(gifmisProcessed?.isitemdistributed));
    dispatch(setFileLabelNumberDistributed(gifmisProcessed?.distributedfilelabelnumber));
    dispatch(setQuantityDistributed(gifmisProcessed?.quantitydistributed));
    dispatch(setAvailableInStore(gifmisProcessed?.availableinstore));
    dispatch(setAnyAvailableInStore(gifmisProcessed?.anyavailableinstore));
    dispatch(setQuantityInStore(gifmisProcessed?.quantitysendtostore));
    dispatch(setStoreFileLabelNumber(gifmisProcessed?.qtysendfilelabelnumber));
    dispatch(setQuantityInStore1(gifmisProcessed?.actualquantityinstore));
    dispatch(setFileLabelNumber1(gifmisProcessed?.storefilelabelnumber));
    dispatch(setIpcSupported(gifmisProcessed?.ipcsupported));
    dispatch(setIpcDetails(gifmisProcessed?.ipcdetails));

  

  const handleEdit = () => {

  }


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
          {transaction?.vendorname}
        </h2>
        <div className="flex justify-center">
          <div className="flex flex-col space-y-4 mr-4">
            <div className="">
              <p className="font-bold text-xs">
                ORGNAME:
                <span className="font-normal"> {transaction?.orgname}</span>
              </p>
            </div>
            <div className="">
              <p className="font-bold text-xs">
                INVOICE NUMBER:
                <span className="font-normal"> {transaction?.invoiceno}</span>
              </p>
            </div>

            <div className="">
              <p className="font-bold text-xs">
                DESCRIPTION:
                <span className="font-normal text-xs"> {transaction?.description}</span>
              </p>
            </div>
            <div className="">
              <p className="font-bold text-xs">
                EXP TYPE:
                <span className="font-normal"> {transaction?.expendituretype}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-4 mr-4">
            <div className="">
              <p className="font-bold text-xs">
                INV GROSS AMOUNT:
                <span className=" text-xs font-normal"> {transaction?.invgrossamount?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                </span>
              </p>
            </div>

            <div className="">
              <p className="font-bold text-xs">
                AMOUNT PAID: <span className="text-xs font-normal"> {amountPaid?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                </span>
              </p>
            </div>
            <div className="">
              <p className="font-bold text-xs">
                BALANCE TO BE PAID: <span className="text-xs font-normal"> {balanceToBePaid?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                </span>
              </p>
            </div>
            <div className="">
              <p className="font-bold text-xs">
                PAYMENT STATUS:
                <span className="font-normal"> {transaction?.payment}
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
            className="font-medium bg-red-400 text-black px-[4rem] py-[0.25rem] mt-12 -ml-[5%] justify-center rounded"
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
