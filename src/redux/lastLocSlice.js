import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  lastLocation: {lat: 0, long: 0},
};

const lastLocSlice = createSlice({
  name: 'lastLoc',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.lastLocation = action.payload;
      console.log(state.lastLocation, '============REDUX');
    },
  },
});

export const {setLocation} = lastLocSlice.actions;
export const selectLastLocation = state => state.lastLoc.lastLocation;
export default lastLocSlice.reducer;
