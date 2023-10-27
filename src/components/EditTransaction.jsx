import React, { useEffect, useState } from "react";
import { useLocation, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../server/server";
import {useSelector, useDispatch } from "react-redux";
import {
  setPaymentStatus,
  setTransactions,
} from "../redux/editfeatures/form1EditSlice";
import {
  setTransactions2,
  setAdvancedPayment,
} from "../redux/editfeatures/form2EditSlice";
import {
  setFundingType,
  setWarrantSupported,
  setWarrantDate,
  setWarrantNo,
  setFileLabelNumber,
  setWarrantAmount,
} from "../redux/editfeatures/Form3EditSlice";
import {
  setExpenditureType,
  setContracts,
  setAvailabeContracts,
} from "../redux/editfeatures/form4EditSlice";
import {
  setTransactionInGifmis,
  setPurchaseOrderNo,
  setInvoiceNo,
  setFileLabelNumberGifmis,
} from "../redux/editfeatures/form5EditSlice";
import {
  setSuppliances, 
  setServices, 
  setIsItemSupplied, 
  setIsServiceCompleted
} from "../redux/editfeatures/form6EditSlice";
import {
  setFileLabelNumberItem,
  setIsItemDistributed,
  setQuantityDistributed,
} from "../redux/editfeatures/form7EditSlice";
import { updateGifmisProcessed } from "../utils/saveGifmisProcessed";
const EditTransaction = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [transaction, setTransaction] = useState();
  const [amountPaid, setAmountPaid] = useState();
  const [balanceToBePaid, setBalancetobepaid] = useState();
  const [data, setData] = useState();
  //console.log(id);
  const location = useLocation();
  const navigate = useNavigate();
  const handleOnClose = (e) => {
    navigate("/dashboard/gifmisprocessed");
    window.location.reload();
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${server}gifmisprocessed/${id}`);
      setData(response.data);
    };
    getData();
  }, []);

  useEffect(() => {
    dispatch(setPaymentStatus(data?.transaction?.payment));
    setTransaction(data?.transaction);
    setAmountPaid(data?.transactionDetails?.amountpaid);
    setBalancetobepaid(data?.transactionDetails?.balancetobepaid);
    if (data?.transaction?.payment === "partial payment") {
      dispatch(setTransactions2(data?.transactionDetails?.transactions));
    } else if (data?.transaction?.payment === "fully paid") {
      dispatch(setTransactions(data?.transactionDetails?.transactions));
    }
    if (data?.transaction?.advancedpayment === "true") {
      dispatch(setAdvancedPayment(true));
    } else if (data?.transaction?.advancedpayment === "false") {
      dispatch(setAdvancedPayment(false));
    }
    let warrantSupportedToUpdate = false;
    if (data?.transaction?.warrantsupported === "true") {
      warrantSupportedToUpdate = true;
    } else if (data?.transaction?.warrantsupported === "false") {
      warrantSupportedToUpdate = false;
    }
    let availableContractsToUpdate = false;
    if (data?.transaction?.availablecontracts === "true") {
      availableContractsToUpdate = true;
    } else if (data?.transaction?.availablecontracts === "false") {
      availableContractsToUpdate = false;
    }
    let transactionInGifmisToUpdate = false;
    if (data?.transaction?.transactioningifmis === "true") {
      transactionInGifmisToUpdate = true;
    } else if (data?.transaction?.transactioningifmis === "false") {
      transactionInGifmisToUpdate = false;
    }
    let isItemSuppliedToUpdate = false;
    if (data?.transaction?.isitemsupplied === "true") {
      isItemSuppliedToUpdate = true;
    } else if (data?.transaction?.isitemsupplied === "false") {
      isItemSuppliedToUpdate = false;
    }
    let isItemDistributedToUpdate = false;
    if (data?.transaction?.isitemdistributed === "true") {
      isItemDistributedToUpdate = true;
    } else if (data?.transaction?.isitemdistributed === "false") {
      isItemDistributedToUpdate = false;
    };
    let isServiceCompletedToUpdate = false;
    if (data?.transaction?.isservicecompleted === "true") {
      isServiceCompletedToUpdate = true;
    } else if (data?.transaction?.isservicecompleted === "false") {
      isServiceCompletedToUpdate = false;
    };

dispatch(setIsItemDistributed(isItemDistributedToUpdate));
    dispatch(setFileLabelNumberItem(data?.transaction?.distributedfilelabelnumber));
    dispatch(setQuantityDistributed(data?.transaction?.quantitydistributed));
    dispatch(setIsItemSupplied(isItemSuppliedToUpdate));
    dispatch(setIsServiceCompleted(isServiceCompletedToUpdate));
    dispatch(setSuppliances(data?.transactionDetails?.suppliances));
    dispatch(setServices(data?.transactionDetails?.services));
    dispatch(setTransactionInGifmis(transactionInGifmisToUpdate));
    dispatch(setPurchaseOrderNo(data?.transaction?.purchaseorderno));
    dispatch(setInvoiceNo(data?.transaction?.invoiceno));
    dispatch(setFileLabelNumberGifmis(data?.transaction?.gifmisfilelabelnumber));
    dispatch(setContracts(data?.transactionDetails?.contracts));
    dispatch(setExpenditureType(data?.transaction?.expendituretype));
    dispatch(setAvailabeContracts(availableContractsToUpdate));
    dispatch(setFundingType(data?.transaction?.fundingtype));
    dispatch(setWarrantSupported(warrantSupportedToUpdate));
    dispatch(setWarrantDate(data?.transaction?.warrantdate));
    dispatch(setWarrantNo(data?.transaction?.warrantno));
    dispatch(setWarrantAmount(data?.transaction?.warrantamount));
    dispatch(setFileLabelNumber(data?.transaction?.warrantfilelabelnumber));
  }, [data]);

    let advancedPayment = useSelector((state) => state.form2Edit.advancedPayment);
    let paymentStatus = useSelector((state) => state.form1Edit.paymentStatus);
    let transactions1 = useSelector((state) => state.form1Edit.transactions);
    let transactions2 = useSelector((state) => state.form2Edit.transactions);
    let transactionsToSave = [];
    let fundingType = useSelector((state) => state.form3Edit.fundingtype);
    let warrantSupported = useSelector((state) => state.form3Edit.warrantsupported);
    let warrantToSave = "";
    let warrantAmount = useSelector((state) => state.form3Edit.warrantamount);
    let warrantDate = useSelector((state) => state.form3Edit.warrantdate);
    let warrantNo = useSelector((state) => state.form3Edit.warrantno);
    let fileLabelNumber = useSelector((state) => state.form3Edit.filelabelnumber);
    let expenditureType = useSelector((state) => state.form4Edit.expendituretype);
    let availableContracts = useSelector((state) => state.form4Edit.availablecontracts);
    let contracts = useSelector((state) => state.form4Edit.contracts);
    let transactionInGIFMIS = useSelector((state) => state.form5Edit.transactioningifmis);
    let purchaseOrderNo = useSelector((state) => state.form5Edit.purchaseorderno);
    let invoiceNo = useSelector((state) => state.form5Edit.invoiceno);
    let gifmisFileLabelNumber = useSelector((state) => state.form5Edit.filelabelnumber);
    let purchaseOrderNoToSave = "";
    let invoiceNoToSave = "";
    let gifmisFileLabelNumberToSave = "";
    let isItemSupplied = useSelector((state) => state.form6Edit.isItemSupplied);
    let suppliances = useSelector((state) => state.form6Edit.suppliances);
    let suppliancesToSave = [];
    let isItemDistributed = useSelector((state) => state.form7Edit.isItemDistributed);
    let distributedFileLabelNumber = useSelector((state) => state.form7Edit.filelabelnumber);
    let quantityDistributed = useSelector((state) => state.form7Edit.quantitydistributed);
    let distributedFileLabelNumberToSave = "";
    let quantityDistributedToSave = "";
    let isServiceCompleted = useSelector((state) => state.form6Edit.isServiceCompleted);
    let services = useSelector((state) => state.form6Edit.services);
    let servicesToSave = [];
    
    if (isItemDistributed && expenditureType === "Goods") {
      distributedFileLabelNumberToSave = distributedFileLabelNumber;
      quantityDistributedToSave = quantityDistributed;
    }
    if (isItemSupplied && expenditureType === "Goods") {
      suppliancesToSave = suppliances;
    }
    if (isServiceCompleted && expenditureType === "Service") {
      servicesToSave = services;
    }
    if (transactionInGIFMIS) {
      purchaseOrderNoToSave = purchaseOrderNo;
      invoiceNoToSave = invoiceNo;
      gifmisFileLabelNumberToSave = gifmisFileLabelNumber;
    }
    if (paymentStatus === "fully paid") {
      transactionsToSave = transactions1;
      advancedPayment = false;
    } else if (paymentStatus === "partial payment") {
      transactionsToSave = transactions2;
    }
    if (fundingType === "Central government") {
      warrantToSave = warrantSupported;
    }
   
  

  const handleEdit = () => {
    console.log("paymentStatus", paymentStatus);
    console.log("anyAdvancePayment", advancedPayment); // Yes or No
    console.log("transactions", transactionsToSave);
    console.log("fundingType", fundingType);
    console.log("warrantToSave", warrantToSave); // Yes or No
    console.log("warrantAmount", warrantAmount);
    console.log("warrantDate", warrantDate);
    console.log("warrantNo", warrantNo);
    console.log("fileLabelNumber", fileLabelNumber);
    console.log("expenditureType", expenditureType);
    console.log("availableContracts", availableContracts); // Yes or No
    console.log("contracts", contracts);
    console.log("transactionInGifmis", transactionInGIFMIS); // Yes or No
    console.log("purchaseOrderNoToSave", purchaseOrderNoToSave);
    console.log("invoiceNoToSave", invoiceNoToSave);
    console.log("gifmisFileLabelNumberToSave", gifmisFileLabelNumberToSave);
    console.log("isItemSupplied", isItemSupplied); // Yes or No
    console.log("suppliancesToSave", suppliancesToSave);
    console.log("isItemDistributed", isItemDistributed); // Yes or No
    console.log("distributedFileLabelNumberToSave", distributedFileLabelNumberToSave);
    console.log("quantityDistributedToSave", quantityDistributedToSave);
    console.log("isServiceCompleted", isServiceCompleted); // Yes or No
    console.log("servicesToSave", servicesToSave);
    console.log("orgname", transaction?.orgname);
    console.log("invoicenum", transaction?.invoiceno);
    console.log("description", transaction?.description);
    console.log("vendorname", transaction?.vendorname);
    console.log("invgrossamount", transaction?.invgrossamount);

    const data = {
      payment: paymentStatus,
      transactions: transactionsToSave,
      advancedpayment: advancedPayment,
      fundingtype: fundingType,
      warrantsupported: warrantToSave,
      warrantamount: warrantAmount,
      warrantdate: warrantDate,
      warrantno: warrantNo,
      warrantfilelabelnumber: fileLabelNumber,
      expendituretype: expenditureType,
      availablecontracts: availableContracts,
      contracts: contracts,
      transactioningifmis: transactionInGIFMIS,
      purchaseorderno: purchaseOrderNoToSave,
      invoiceno: invoiceNoToSave,
      gifmisfilelabelnumber: gifmisFileLabelNumberToSave,
      isitemsupplied: isItemSupplied,
      suppliances: suppliancesToSave,
      isitemdistributed: isItemDistributed,
      distributedfilelabelnumber: distributedFileLabelNumberToSave,
      quantitydistributed: quantityDistributedToSave,
      isservicecompleted: isServiceCompleted,
      services: servicesToSave,
      orgname: transaction?.orgname,
      description: transaction?.description,
      vendorname: transaction?.vendorname,
      invgrossamount: transaction?.invgrossamount,
      idgifmis: transaction?.idgifmis,
      idgifmisprocessed: transaction?.id
    }
    updateGifmisProcessed(data, transaction?.id);
    //console.log("contracts", contracts);
    navigate("/dashboard/gifmisprocessed");
    window.location.reload();
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
