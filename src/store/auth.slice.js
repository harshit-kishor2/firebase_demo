import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {LoadingStatus, getMessageFromErrorCode} from '../helpers';
import auth from '@react-native-firebase/auth';

const SLICE_FEATURE_KEY = 'auth';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  isAuthenticate: false,

  stayLoadingStatus: LoadingStatus.NOT_LOADED,
  stayError: null,

  registerLoadingStatus: LoadingStatus.NOT_LOADED,
  registerError: null,

  loginLoadingStatus: LoadingStatus.NOT_LOADED,
  userDetails: null,
  loginError: null,

  logoutLoadingStatus: LoadingStatus.NOT_LOADED,
  logoutError: null,
});

/**
 * registerAction
 */

export const stayLoginAction = createAsyncThunk(
  `${SLICE_FEATURE_KEY}/stayLoginAction`,
  async (val, thunkAPI) => {
    try {
      let response = auth().currentUser;
      return response;
    } catch (error) {
      console.log('error', error);
      let message = getMessageFromErrorCode(error.code);
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : message,
      );
    }
  },
);

/**
 * registerAction
 */

export const registerAction = createAsyncThunk(
  `${SLICE_FEATURE_KEY}/registerAction`,
  async (val, thunkAPI) => {
    try {
      let response = await auth().createUserWithEmailAndPassword(
        val?.email,
        val?.password,
      );
      return response.user;
    } catch (error) {
      let message = getMessageFromErrorCode(error.code);
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : message,
      );
    }
  },
);

/**
 * loginAction
 */

export const loginAction = createAsyncThunk(
  `${SLICE_FEATURE_KEY}/loginAction`,
  async (val, thunkAPI) => {
    try {
      let response = await auth().signInWithEmailAndPassword(
        val?.email,
        val?.password,
      );
      console.log(response.user, 'loginAction Response');
      return response.user;
    } catch (error) {
      let message = getMessageFromErrorCode(error.code);
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : message,
      );
    }
  },
);

/**
 * logoutAction
 */

export const logoutAction = createAsyncThunk(
  `${SLICE_FEATURE_KEY}/logoutAction`,
  async (val, thunkAPI) => {
    try {
      await auth().signOut();
      return true;
    } catch (error) {
      let message = getMessageFromErrorCode(error.code);
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : message,
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
      // register action
      .addCase(registerAction.pending, state => {
        state.registerLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.registerLoadingStatus = LoadingStatus.LOADED;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.registerLoadingStatus = LoadingStatus.FAILED;
        state.registerError = action.payload || action.error.message;
      })
      // login action
      .addCase(loginAction.pending, state => {
        state.loginLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loginLoadingStatus = LoadingStatus.LOADED;
        state.userDetails = action.payload;
        state.isAuthenticate = true;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loginLoadingStatus = LoadingStatus.FAILED;
        state.loginError = action.payload || action.error.message;
      })
      // logout action
      .addCase(logoutAction.pending, state => {
        state.logoutLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.logoutLoadingStatus = LoadingStatus.LOADED;
        state.userDetails = null;
        state.isAuthenticate = false;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.logoutLoadingStatus = LoadingStatus.FAILED;
        state.logoutError = action.payload || action.error.message;
      })
      // stay login action
      .addCase(stayLoginAction.pending, state => {
        state.stayLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(stayLoginAction.fulfilled, (state, action) => {
        state.stayLoadingStatus = LoadingStatus.LOADED;
        if (action.payload) {
          state.userDetails = action.payload;
          state.isAuthenticate = true;
        }
      })
      .addCase(stayLoginAction.rejected, (state, action) => {
        state.stayLoadingStatus = LoadingStatus.FAILED;
        state.stayError = action.payload || action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const authReducer = reduxSlice.reducer;

export const authActions = reduxSlice.actions;
