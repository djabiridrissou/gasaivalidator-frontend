import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleAvailableBta, setBtaAmount, setBtaDate, setBtaReferenceNumber } from "../../redux/features/form11Slice";
import { formatNumber } from "../../functions/helperFunctions";

const Form10 = () => {
    const { id } = useParams();
    const currentPath = window.location.pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const availableBta = useSelector((state) => state.form11.availableBta);
    const btaDate = useSelector((state) => state.form11.btaDate);
    const btaAmount = useSelector((state) => state.form11.btaAmount);
    const btaReferenceNumber = useSelector((state) => state.form11.btaReferenceNumber);

    const handleBtaAmountChange = (e) => {
        const formattedValue = formatNumber(e.target.value);
        dispatch(setBtaAmount(formattedValue));
    };


    return (
        <>
            <div>
                <div className="mt-4">
                </div>
                <div className="mt-6">
                    <div className="flex flex-col items-center">
                        <div className="mt-2 flex justify-between items-center">

                        </div>
                    </div>
                    <div className="mt-6">

                        <div >
                            <div className="flex flex-col items-center">
                                <label className="block mt-2  text-sm text-[13.5px] text-gray-700 font-semibold">
                                    Available BTA ?
                                </label>
                                <div className="mt-2 flex justify-between items-center">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            id="availableBtaYes"
                                            name="availableBta"
                                            checked={availableBta}
                                            onChange={() => dispatch(toggleAvailableBta())}
                                            className="form-checkbox h-4 w-4"
                                        />
                                        <span className="ml-1 text-[13px]">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                        <input
                                            type="checkbox"
                                            id="availableBtaNo"
                                            name="availableBta"
                                            checked={!availableBta}
                                            onChange={() => dispatch(toggleAvailableBta())}
                                            className="form-checkbox h-4 w-4"
                                        />
                                        <span className="ml-1 text-[13px]">No</span>
                                    </label>
                                </div>
                            </div>
                            <div className="mt-4">
                                {(availableBta) && (
                                    <div className="flex justify justify-center gap-4">
                                        <div className="">
                                            <label
                                                htmlFor="paymentDate"
                                                className="text-[13.5px] text-gray-700"
                                            >
                                                BTA Date
                                            </label>
                                            <input
                                                type="date"
                                                id="btaDate"
                                                value={btaDate}
                                                onChange={(e) => dispatch(setBtaDate(e.target.value))}
                                                className="appearance-none w-full block text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                                            />
                                        </div>{" "}
                                        <div>
                                            <label htmlFor="pvNo" className="text-[13.5px] text-gray-700">
                                                BTA Amount
                                            </label>
                                            <input
                                                type="text"
                                                id="btaAmount."
                                                value={btaAmount}
                                                onInput={handleBtaAmountChange}
                                                placeholder="BTA Amount."
                                                className="appearance-none block text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="pvNo" className="text-[13.5px] text-gray-700">
                                                BTA Reference Number
                                            </label>
                                            <input
                                                type="text"
                                                id="btaReferenceNumber"
                                                value={btaReferenceNumber}

                                                onChange={(e) => dispatch(setBtaReferenceNumber(e.target.value))}
                                                placeholder="BTA Ref. Number."
                                                className="appearance-none block text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                                            />
                                        </div>
                                    </div>

                                )}

                            </div>
                        </div>


                    </div>

                    <div className="flex space-x-2 mt-6 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-black text-white px-4 py-2 border-full rounded"
                        >
                            Back
                        </button>
                        {currentPath.startsWith("/dashboard/transactiondetails") && (
                            <button
                                onClick={() => {
                                    if (availableBta && (!btaAmount || !btaDate || !btaReferenceNumber)) {
                                        return;
                                    }
                                    navigate(`/dashboard/transactiondetails/${id}/3`)
                                }}
                                className={`bg-blue-500 text-white px-4 py-2 border-full rounded`}

                            >
                                Next
                            </button>
                        )}
                        {currentPath.startsWith("/dashboard/edittransaction") && (
                            <button
                                onClick={() => {
                                    if (availableBta && (!btaAmount || !btaDate || !btaReferenceNumber)) {
                                        return;
                                    }
                                    navigate(`/dashboard/edittransaction/${id}/3`)
                                }}
                                className={`bg-blue-500 text-white px-4 py-2 border-full rounded `}

                            >
                                Next
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}

export default Form10;