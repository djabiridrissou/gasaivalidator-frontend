import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staffID: "",
  lastName: "",
  otherNames: "",
  department: "",
  branch: "",
  departmentList: [],
  branchList: [],
  isTeamLeader: false,
  organization: { id: "", name: "" },
  organizationList: [],
  members: [],
  membersList: [],
  loading: false,
  password: "",
  confirmPassword: "",
  departmentChoose: { id: "", name: "" },
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setStaffID: (state, action) => {
      state.staffID = action.payload;
    },

    setDepartmentChoose: (state, action) => {
      state.departmentChoose = action.payload;
    },

    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setOtherNames: (state, action) => {
      state.otherNames = action.payload;
    },
    setDepartment: (state, action) => {
      state.department = action.payload;
    },
    setBranch: (state, action) => {
      state.branch = action.payload;
    },

    setDepartmentList: (state, action) => {
      state.departmentList = action.payload;
    },
    setBranchList: (state, action) => {
      state.branchList = action.payload;
    },
    toggleIsTeamLeader: (state) => {
      state.isTeamLeader = !state.isTeamLeader;
    },

    setOrganization: (state, action) => {
      state.organization = action.payload;
    },

    setOrganizationList: (state, action) => {
      state.organizationList = action.payload;
    },

    setMembers: (state, action) => {
      state.members = action.payload;
    },

    setMemberList: (state, action) => {
      state.membersList = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
  },
});

export const {
  setStaffID,
  setLastName,
  setOtherNames,
  setDepartment,
  setBranch,
  setDepartmentList,
  setBranchList,
  setIsTeamLeader,
  setOrganization,
  setOrganizationList,
  setMembers,
  setMemberList,
  setLoading,
  setPassword,
  setConfirmPassword,
  setDepartmentChoose,
  toggleIsTeamLeader,
} = registerSlice.actions;

export default registerSlice.reducer;
