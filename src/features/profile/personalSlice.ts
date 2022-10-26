import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserProfile, setUserProfile } from '../../api/mock-api';
import { Profile } from '../../api/mock-api';

interface PersonalState {
  profile: Profile | null | undefined;
  error?: any;
}

export const fetchPersonalData = createAsyncThunk(
  'fetchPersonalData',
  async (data, thunkAPI) => {
    try {
      const response: Profile = await getUserProfile();
      return response;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.message);
    }
  }
);

export const updatePersonalData = createAsyncThunk(
  'updatePersonalData',
  async (profile: Profile, thunkAPI) => {
    try {
      await setUserProfile(profile);
      return profile;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.message);
    }
  }
);

const initialState: PersonalState = {
  profile: null,
};

export const personalSlice = createSlice({
  name: 'personal',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPersonalData.fulfilled, (state, action) => {
      setTimeout(() => {}, 1000);
      return { ...state, profile: action.payload };
    });
    builder.addCase(fetchPersonalData.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
    builder.addCase(updatePersonalData.fulfilled, (state, action) => {
      setTimeout(() => {}, 1000);
      return { ...state, profile: { ...state.profile, ...action.payload } };
    });
    builder.addCase(updatePersonalData.rejected, (state, action) => {
      return { ...state, error: action.payload };
    });
  },
});

export default personalSlice.reducer;
