import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {LoadingStatus} from '../helpers';

const SLICE_FEATURE_KEY = 'auth';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  loadingStatus: LoadingStatus.NOT_LOADED,
  userDetails: null,
  userDetailError: null,
  isAuthenticate: true,
});

/**
 * api Action
 */

export const apiAction = createAsyncThunk(
  `${SLICE_FEATURE_KEY}/apiAction`,
  async (val, thunkAPI) => {
    try {
      // const result = await axiosRequest({
      //   url: '/api_url',
      //   method: 'POST',
      //   data: val,
      // });
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);

/**
 * Slice for all reducres
 */
const reduxSlice = createSlice({
  name: SLICE_FEATURE_KEY,
  initialState,
  reducers: {
    resetSliceState: (state, action) => {
      return {
        ...state,
      };
    },
  },
  extraReducers: builder => {
    builder
      // api action
      .addCase(apiAction.pending, state => {
        state.loadingStatus = LoadingStatus.LOADING;
      })
      .addCase(apiAction.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.LOADED;
        state.userDetails = action.payload?.user;
      })
      .addCase(apiAction.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.FAILED;
        state.loginError = action.payload || action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const authReducer = reduxSlice.reducer;

export const authActions = reduxSlice.actions;
