// rootReducer.js
import { combineReducers } from "redux";
import registerReducer from "../features/registerSlice";
import uclReducer from "./ucl/uclReducer";
import form1Reducer from "../features/form1Slice";
import form2Reducer from "../features/form2Slice";
import form3Reducer from "../features/Form3Slice";
import form4Reducer from "../features/form4Slice";
import form5Reducer from "../features/form5Slice";
import form6Reducer from "../features/form6Slice";
import form7Reducer from "../features/form7Slice";
import form8Reducer from "../features/form8Slice";
import form9Reducer from "../features/form9Slice";
import form10Reducer from "../features/form10Slice";
import form11Reducer from "../features/form11Slice";
import branch_departmentReducer from "../features/branch_departmentSlice";
import form1EditReducer from "../editfeatures/form1EditSlice";
import form2EditReducer from "../editfeatures/form2EditSlice";
import form3EditReducer from "../editfeatures/Form3EditSlice";
import form4EditReducer from "../editfeatures/form4EditSlice";
import form5EditReducer from "../editfeatures/form5EditSlice";
import form6EditReducer from "../editfeatures/form6EditSlice";
import form7EditReducer from "../editfeatures/form7EditSlice";
import authReducer from "../features/auth";
import usersReducer from "../features/users";
import uploadReducer from "../features/upload";
import gifmisReducer from "../features/gifmis";
import gifmisProcessedReducer from "../features/gifmis-processed";
import noWorkDoneReducer from "../features/noworkdoneSlice";
import misclassifiedReducer from "../features/misclassifiedSlice";



const rootReducer = combineReducers({
  register: registerReducer,
  auth: authReducer,
  users: usersReducer,
  upload: uploadReducer,
  ucl: uclReducer,
  gifmis: gifmisReducer,
  gifmisProcessed: gifmisProcessedReducer,
  form1: form1Reducer,
  form2: form2Reducer,
  form3: form3Reducer,
  form4: form4Reducer,
  form5: form5Reducer,
  form6: form6Reducer,
  form7: form7Reducer,
  form8: form8Reducer,
  form9: form9Reducer,
  form10: form10Reducer,
  form11: form11Reducer,
  branch_department: branch_departmentReducer,
  form1Edit: form1EditReducer,
  form2Edit: form2EditReducer,
  form3Edit: form3EditReducer,
  form4Edit: form4EditReducer,
  form5Edit: form5EditReducer,
  form6Edit: form6EditReducer,
  form7Edit: form7EditReducer,
  noworkdone: noWorkDoneReducer,
  misclassified: misclassifiedReducer,

});

export default rootReducer;
