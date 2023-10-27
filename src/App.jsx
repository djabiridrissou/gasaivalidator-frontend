import { Route, Routes } from "react-router-dom";
import {
  Login,
  Register,
  CreateDepartment,
  CreateBranch,
  Layout,
  Dashboard,
  Goods,
  Gifmisprocessed,
  TransactionDetails,
  Form1,
  Form3,
  Form4,
  Form5,
  Form6,
  Form7,
  Form8,
  Form9,
  EditTransaction,
  Form1Edit,
  ViewDetails,
  Form3Edit,
  Form4Edit,
  Form5Edit,
  Form6Edit,
  Form7Edit,
  UserFileUpload,
} from "./routes/routes";
import OrgTransactions from "./pages/OrgTransactions";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
     
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/goods" element={<Goods />} />
          <Route
            path="/dashboard/gifmisprocessed"
            element={<Gifmisprocessed />}
          />
          <Route path="/dashboard/view/:id" element={<ViewDetails />} />

          <Route path="/dashboard/create-department" element={<CreateDepartment />} />
          <Route path="/dashboard/create-branch" element={<CreateBranch />} />
          <Route path="/dashboard/userfileupload" element={<UserFileUpload/>}/>
          <Route path="/dashboard/orgtransactions" element={<OrgTransactions/>}/>
          <Route path="/dashboard/register" element={<Register />} />
          <Route
            path="/dashboard/transactiondetails/:id"
            element={<TransactionDetails />}
          >
            <Route index element={<Form1 />} />
            <Route path="2" element={<Form3 />} />
            <Route path="3" element={<Form4 />} />
            <Route path="4" element={<Form5 />} />
            <Route path="5" element={<Form6 />} />
            <Route path="6" element={<Form7 />} />
            <Route path="7" element={<Form8 />} />
            <Route path="8" element={<Form9 />} />
          </Route>
        </Route>
        <Route
          path="/dashboard/edittransaction/:id"
          element={<EditTransaction />}
        >
          <Route index element={<Form1Edit />} />
          <Route path="2" element={<Form3Edit />} />
          <Route path="3" element={<Form4Edit />} />
          <Route path="4" element={<Form5Edit />} />
          <Route path="5" element={<Form6Edit />} />
          <Route path="6" element={<Form7Edit />} />
        </Route>
      
      </Routes>
    </div>
  );
};

export default App;
