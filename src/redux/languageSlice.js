import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentLang: [],
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    languageHandler: (state, action) => {
      state.currentLang = action.payload;
      console.log(state?.currentLang, '------LANG REDUX ---');
    },
  },
});

export const {languageHandler} = languageSlice.actions;
export const selectLanguage = state => state?.language?.currentLang;
export default languageSlice.reducer;
