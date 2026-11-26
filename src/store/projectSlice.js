import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};


const projectSlice = createSlice({
name : "projects",
initialState,
reducers :{},
})

export const selectProjects = (state) => state.projects.items;

export default projectSlice.reducer;