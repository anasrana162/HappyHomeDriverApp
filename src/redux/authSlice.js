import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  authData: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.authData = [action.payload];
      console.log(state.authData, '------REDUX loginUser');
    },
    
    logoutUser: state => {
      state.authData = [];
      console.log(state.authData, '------REDUX logoutUser');
    },
  },
});

export const {loginUser, logoutUser} = authSlice.actions;
export const selectUser = state => state.auth.authData;
export default authSlice.reducer;