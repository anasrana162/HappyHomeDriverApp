import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  settings: [],
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    addSetting: (state, action) => {
      state.settings = [action.payload];
      console.log(state?.settings, '------add & upd Settings REDUX---');
    },
    deleteSetting: (state, action) => {
      state.settings = [];
      console.log(state?.settings, '------Delete Settings REDUX---');
    },
  },
});

export const {addSetting, deleteSetting} = settingSlice.actions;
export const selectSetting = state => state.setting.settings;
export default settingSlice.reducer;
