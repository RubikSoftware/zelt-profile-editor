import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserContract, setUserContract } from '../../api/mock-api';
import { Contract } from '../../api/mock-api';

interface ContractState {
  contract: Contract | null | undefined;
  error?: any;
}

export const fetchContract = createAsyncThunk(
  'fetchContract',
  async (data, thunkAPI) => {
    try {
      const response: Contract = await getUserContract();
      return response;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.message);
    }
  }
);

export const updateNewContract = createAsyncThunk(
  'updateContract',
  async (contract: Contract, thunkAPI) => {
    try {
      await setUserContract(contract);
      return contract;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.message);
    }
  }
);

const initialState: ContractState = {
  contract: null,
};

export const contractSlice = createSlice({
  name: 'contract',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContract.fulfilled, (state, action) => {
      return { ...state, contract: action.payload };
    });
    builder.addCase(fetchContract.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(updateNewContract.fulfilled, (state, action) => {
      return { ...state, contract: { ...state.contract, ...action.payload } };
    });
    builder.addCase(updateNewContract.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
  },
});

export default contractSlice.reducer;
