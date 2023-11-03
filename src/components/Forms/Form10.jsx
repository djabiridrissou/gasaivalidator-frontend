import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { districtData } from "../../utils/district.Js";
import { setRegionalLocation, setDistrictLocation } from "../../redux/features/form6Slice";
import { toggleOnPremise, toggleAuditorSatisfy, setAuditorDetails } from "../../redux/features/form10Slice";

const Form10 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const regionalLocation = useSelector((state) => state.form6.regionalLocation);
    const districtLocation = useSelector((state) => state.form6.districtLocation);
    const districtList = districtData[regionalLocation];
    const expenditureType = useSelector((state) => state.form4.expenditureType);
    const onPremise = useSelector((state) => state.form10.onPremise);
    const auditorSatisfy = useSelector((state) => state.form10.auditorSatisfy);
    const auditorDetails = useSelector((state) => state.form10.auditorDetails);


    const handleRegionalLocationChange = (e) => {
        dispatch(setRegionalLocation(e.target.value));
    };

    const handleDistrictLocationChange = (e) => {
        dispatch(setDistrictLocation(e.target.value));
    };

    const regionsInGhana = [
        { id: "1", name: "Ahafo" },
        { id: "2", name: "Ashanti" },
        { id: "3", name: "Bono East" },
        { id: "4", name: "Bono" },
        { id: "5", name: "Central" },
        { id: "6", name: "Eastern" },
        { id: "7", name: "Greater Accra" },
        { id: "8", name: "North East" },
        { id: "9", name: "Northern" },
        { id: "10", name: "Oti" },
        { id: "11", name: "Savannah" },
        { id: "12", name: "Upper East" },
        { id: "13", name: "Upper West" },
        { id: "14", name: "Western" },
        { id: "15", name: "Western North" },
        { id: "16", name: "Volta" },
    ];

    return (
        <>
            <div>
                <div className="mt-4">
                    <div className="mb-3 flex flex-col items-center flex-wrap">
                        <label
                            htmlFor="location"
                            className="block mt-2  text-sm text-[13.5px] text-gray-700 font-semibold"
                        >
                            Select Location
                        </label>
                        <select
                            name="regionalLocation"
                            id="regionalLocation"
                            value={regionalLocation}
                            onChange={handleRegionalLocationChange}
                            className={`mt-3 block  text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
                        >
                            <option value="">------------------------</option>
                            {regionsInGhana.map((region) => (
                                <option key={region.id} value={region.name}>
                                    {region.name}
                                </option>
                            ))}{" "}
                        </select>
                    </div>
                </div>
                <div>
                    <div className="mb-3 flex flex-col items-center flex-wrap">
                        <label
                            htmlFor="districtLocation"
                            className="block mt-2  text-sm text-[13.5px] text-gray-700 font-semibold"
                        >
                            <span className="font-bold">{regionalLocation}</span>  Which district ?
                        </label>
                        <select
                            name="districtLocation"
                            id="districtLocation"
                            value={districtLocation}
                            onChange={handleDistrictLocationChange}
                            className={`mt-3 block  text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
                        >
                            <option value="default">------------------------</option>
                            {districtList?.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}{" "}
                        </select>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex flex-col items-center">
                        <div className="mt-2 flex justify-between items-center">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    id="onPremiseYes"
                                    name="onPremise"
                                    checked={onPremise}
                                    onChange={() => dispatch(toggleOnPremise())}
                                    className="form-checkbox h-4 w-4"
                                />
                                <span className="ml-1 text-[13px] font-semibold">On-Premise</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input
                                    type="checkbox"
                                    id="onPremiseNo"
                                    name="onPremise"
                                    checked={!onPremise}
                                    onChange={() => dispatch(toggleOnPremise())}
                                    className="form-checkbox h-4 w-4"
                                />
                                <span className="ml-1 text-[13px] font-semibold">Off-Premise</span>
                            </label>
                        </div>
                    </div>
                    <div className="mt-6">
                        {onPremise && (
                            <div>
                                <div className="flex flex-col items-center">
                                <label className="block mt-2  text-sm text-[13.5px] text-gray-700 font-semibold">
                                    Is auditor satisfy with work done ?
                                </label>
                                <div className="mt-2 flex justify-between items-center">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            id="auditorSatisfyYes"
                                            name="auditorSatisfy"
                                            checked={auditorSatisfy}
                                            onChange={() => dispatch(toggleAuditorSatisfy())}
                                            className="form-checkbox h-4 w-4"
                                        />
                                        <span className="ml-1 text-[13px]">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                        <input
                                            type="checkbox"
                                            id="auditorSatisfyNo"
                                            name="auditorSatisfy"
                                            checked={!auditorSatisfy}
                                            onChange={() => dispatch(toggleAuditorSatisfy())}
                                            className="form-checkbox h-4 w-4"
                                        />
                                        <span className="ml-1 text-[13px]">No</span>
                                    </label>
                                </div>
                            </div>
                            <div className="mt-6">
                        {!(auditorSatisfy) && (
                            <div className="flex flex-col items-center">
                                <label htmlFor="details" className="font-semibold">Provide details</label>
                                <textarea
                                    name="auditorDetails"
                                    id="auditorDetails"
                                    cols="30"
                                    rows="5"
                                    placeholder="Provide details"
                                    value={auditorDetails}
                                    onChange={(e) => dispatch(setAuditorDetails(e.target.value))}
                                    className="mt-2 w-[25%] text-[0.9rem] px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                                />
                            </div>
                        )}

                    </div>
                            </div>
                            
                        )}
                    </div>
                 
                    <div className="flex space-x-2 mt-6 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-black text-white px-4 py-2 border-full rounded"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Form10;