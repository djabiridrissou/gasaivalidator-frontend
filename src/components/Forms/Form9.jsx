import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleIpcSupported, updateIpc } from "../../redux/features/form9Slice";
import {
  setRegionalLocation,
  setDistrictLocation,
} from "../../redux/features/form6Slice";
import Form2 from "./Form2";

import { formatNumber } from "../../functions/helperFunctions";

const regionsInGhana = [
  { id: "1", name: "Ahafo" },
  { id: "2", name: "Ashanti" },
  { id: "3", name: "Bono East" },
  { id: "4", name: "Bono Ahafo" },
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


const Form9 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ipcSupported = useSelector((state) => state.form9.ipcSupported);
  const ipcDetails = useSelector((state) => state.form9.ipcDetails);
  const regionalLocation = useSelector((state) => state.form6.regionalLocation);
  const districtLocation = useSelector((state) => state.form6.districtLocation);

  const handleIpcChange = (index, fieldName, value) => {
    //console.log("dans contrat change", index, fieldName, value);
    dispatch(updateIpc({ index, fieldName, value }));
  };

  const handleRegionalLocationChange = (e) => {
    dispatch(setRegionalLocation(e.target.value));
  };

  const handleDistrictLocationChange = (e) => {
    dispatch(setDistrictLocation(e.target.value));
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="">
          <label htmlFor="warrantSupported" className="font-semibold mt-4">
            Available IPC ?
          </label>
          <div className="mt-3">
            <label className="inline-flex items-center ">
              <input
                type="checkbox"
                id="ipcSupportedYes"
                name="ipcSupported"
                checked={ipcSupported}
                onChange={() => dispatch(toggleIpcSupported())}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-1 text-[13px]">Yes</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                id="ipcSupportedNo"
                name="ipcSupported"
                checked={!ipcSupported}
                onChange={() => dispatch(toggleIpcSupported())}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-1 text-[13px]">No</span>
            </label>
          </div>
        </div>
      </div>

      {ipcSupported &&
        ipcDetails.map((ipc, index) => (
          <Fragment key={index}>
            <div className="flex justify-center mt-5">
              <div className="flex flex-col ">
                <label
                  htmlFor="ipcDate"
                  className="text-[13.5px] text-gray-700"
                >
                  IPC Date
                </label>
                <input
                  type="date"
                  id="ipcDate"
                  name="ipcDate"
                  value={ipc.ipcDate}
                  onChange={(e) => {
                    handleIpcChange(index, "ipcDate", e.target.value);
                  }}
                  className="appearance-none w-[90%] block text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
              </div>
              <div>
                <label
                  htmlFor="ipcNumber"
                  className="text-[13.5px] text-gray-700"
                >
                  IPC Number
                </label>
                <input
                  type="text"
                  id="ipcNumber"
                  name="ipcNumber"
                  value={ipc.ipcNumber}
                  onChange={(e) => {
                    handleIpcChange(index, "ipcNumber", e.target.value);
                  }}
                  placeholder="IPC No"
                  className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
              </div>
              <div>
                <label
                  htmlFor="ipcDate"
                  className="text-[13.5px] text-gray-700"
                >
                  IPC Amount
                </label>
                <input
                  type="text"
                  id="ipcAmount"
                  name="ipcAmount"
                  value={ipc.ipcAmount}
                  onChange={(e) => {
                    const formattedValue = formatNumber(e.target.value);
                    handleIpcChange(index, "ipcAmount", formattedValue);
                  }}
                  className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
              </div>
              <div>
                <label
                  htmlFor="ipcDate"
                  className="text-[13.5px] text-gray-700"
                >
                  File Label Number
                </label>
                <input
                  type="text"
                  id="ipcFileLabelNumber"
                  name="ipcFileLabelNumber"
                  value={ipc.fileLabelNumber}
                  onChange={(e) => {
                    handleIpcChange(index, "fileLabelNumber", e.target.value);
                  }}
                  placeholder="File Label No"
                  className="appearance-none block w-[90%] text-[0.9rem]  px-[0.9rem] py-[0.25rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]"
                />
              </div>
            </div>
          </Fragment>
        ))}
      <div className="mt-4">
        <div className="mb-3 flex flex-col items-center flex-wrap">
          <label
            htmlFor="paymentStatus"
            className="block mt-2  text-sm text-[13.5px] text-gray-700 font-semibold"
          >
            Select Work Regional Location
          </label>
          <select
            name="regionalLocation"
            id="regionalLocation"
            value={regionalLocation}
            onChange={handleRegionalLocationChange}
            className={`mt-3 block  text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
          >
            <option value="">------------------------</option>
            <option value="">Select a Region</option>
            {regionsInGhana.map((region) => (
              <option key={region.id} value={region.name}>
                {region.name}
              </option>
            ))}{" "}
          </select>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center  flex-wrap ">
          <label
            htmlFor="paymentStatus"
            className="block mt-2 text-[13.5px] text-gray-700 font-semibold"
          >
            Select Work District Location
          </label>
          <select
            name="districtLocation"
            id="districtLocation"
            value={districtLocation}
            onChange={handleDistrictLocationChange}
            className={`mt-3 block text-[13.5px] px-[0.9rem] py-[0.45rem] border border-[#4a525d] rounded-[0.25rem] shadow-sm placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-[#464f5b] focus:border-[#464f5b]`}
          >
            <option value="">------------------------</option>
            <option value="Adenta">Adenta</option>
            <option value="Abokobi">Abokobi</option>
            <option value="Cantoments">Cantoments</option>
          </select>
        </div>
      </div>
      <div className="flex space-x-2 mt-6 justify-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-4 py-2 border-full rounded"
        >
          Back
        </button>
        <button
          onClick={() => navigate(`/dashboard/transactiondetails/${id}/4`)}
          className="bg-blue-500 text-white px-4 py-2 border-full rounded "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Form9;
