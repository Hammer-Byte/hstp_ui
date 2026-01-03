import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light', // 'light', 'dark', 'system' - though next-themes handles this, Redux can store preferences if needed elsewhere
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMood: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setThemeMood } = themeSlice.actions;
export default themeSlice.reducer;
