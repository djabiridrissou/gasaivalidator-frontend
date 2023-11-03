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
  Form10,
  Form11,
  EditTransaction,
  NoWorkDone,
  ViewDetails,
  UserFileUpload,
  Misclassified,
  NoWarrant,
  NotInGifmis,
  NoContract,
  StoreManagement,
  ContractManagement,
  NoIpc,
  NoJudgement,
  Soa,
  TeamLeaders,
  TeamMembers,
  Overpayment,
  FailedVisit,
} from "./routes/routes";
import OrgTransactions from "./pages/OrgTransactions";
import WithoutIssue from "./pages/WithoutIssue";



const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
     
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/goods" element={<Goods />} />
          <Route path="/dashboard/gifmisprocessed" element={<Gifmisprocessed />} />
          <Route path="/dashboard/view/:id" element={<ViewDetails />} />
          <Route path="/dashboard/create-department" element={<CreateDepartment />} />
          <Route path="/dashboard/create-branch" element={<CreateBranch />} />
          <Route path="/dashboard/userfileupload" element={<UserFileUpload/>}/>
          <Route path="/dashboard/orgtransactions" element={<OrgTransactions/>}/>
          <Route path="/dashboard/register" element={<Register />} />
          <Route path="/dashboard/noworkdone" element={<NoWorkDone />} />
          <Route path="/dashboard/misclassified" element={<Misclassified />} />
          <Route path="/dashboard/nowarrant" element={<NoWarrant />} />
          <Route path="/dashboard/notingifmis" element={<NotInGifmis />} />
          <Route path="/dashboard/nocontract" element={<NoContract />} />
          <Route path="/dashboard/storemanagement" element={<StoreManagement />} />
          <Route path="/dashboard/contractmanagement" element={<ContractManagement />} />
          <Route path="/dashboard/noipc" element={<NoIpc />} />
          <Route path="/dashboard/nojudgement" element={<NoJudgement />} />
          <Route path="/dashboard/soa" element={<Soa />} />
          <Route path="/dashboard/overpayment" element={<Overpayment />} />
          <Route path="/dashboard/failedvisit" element={<FailedVisit />} />
          <Route path="/dashboard/withoutissue" element={<WithoutIssue />} />
          <Route path="/dashboard/teamleaders" element={<TeamLeaders />} />
          <Route path="/dashboard/teammembers" element={<TeamMembers />} />
          <Route path="/dashboard/transactiondetails/:id" element={<TransactionDetails />}>
            <Route index element={<Form1 />} />
            <Route path="2" element={<Form3 />} />
            <Route path="3" element={<Form4 />} />
            <Route path="4" element={<Form5 />} />
            <Route path="5" element={<Form6 />} />
            <Route path="6" element={<Form7 />} />
            <Route path="7" element={<Form8 />} />
            <Route path="8" element={<Form9 />} />
            <Route path="9" element={<Form10 />} />
            <Route path="10" element={<Form11 />} />
          </Route>
        </Route>
        <Route
          path="/dashboard/edittransaction/:id"
          element={<EditTransaction />}
        >
         <Route index element={<Form1 />} />
            <Route path="2" element={<Form3 />} />
            <Route path="3" element={<Form4 />} />
            <Route path="4" element={<Form5 />} />
            <Route path="5" element={<Form6 />} />
            <Route path="6" element={<Form7 />} />
            <Route path="7" element={<Form8 />} />
            <Route path="8" element={<Form9 />} />
            <Route path="9" element={<Form10 />} />
            <Route path="10" element={<Form11 />} />
        </Route>
      
      </Routes>
    </div>
  );
};

export default App;
