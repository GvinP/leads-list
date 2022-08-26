import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {leadsAPI, Lead, User, Pipeline, RootObject } from './leadsAPI'

export interface UserState {
  leads: Lead[]
  users: User[];
  pipelines: Pipeline;
  isLoading: boolean
}

const initialState: UserState = {
  leads: [] as Lead[],
  users: [] as User[],
  pipelines: {} as Pipeline,
  isLoading: false
};

export const fetchLeads = createAsyncThunk<RootObject | undefined, string| undefined>(
  "leads/fetchLeads",
  async (query) => {
    try {
      const response = await leadsAPI.fetchLeads(query);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);


export const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLeads.pending, (state, action)=>{
      state.isLoading = true
    })
    builder.addCase(fetchLeads.fulfilled, (state, action) => {
      state.leads = action.payload?.leads!;
      state.users = action.payload?.users!;
      state.pipelines = action.payload?.pipelines!;
      state.isLoading = false
    })
  },
});

export default leadsSlice.reducer;