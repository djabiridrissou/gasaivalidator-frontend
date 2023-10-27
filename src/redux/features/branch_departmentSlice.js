import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  branchName: "",
  departmentName: "",
  branchDepartment: "",
  departmentId: "",
  department: { id: "", name: "" },
};

const branch_departmentSlice = createSlice({
  name: "branch_department",
  initialState,
  reducers: {
    setBranchName: (state, action) => {
      state.branchName = action.payload;
    },
    setDepartmentName: (state, action) => {
      state.departmentName = action.payload;
    },
    setBranchDepartment: (state, action) => {
      state.branchDepartment = action.payload;
    },
    setDepartment: (state, action) => {
      state.department = action.payload;
    },
  },
});

export const { setBranchName, setDepartmentName, setBranchDepartment, setDepartment } =
  branch_departmentSlice.actions;

export default branch_departmentSlice.reducer;
