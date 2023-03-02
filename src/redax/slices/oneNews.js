import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  oneNews: [],
};

const oneNewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setOneNews(state, action) {
      console.log(action);
      state.oneNews = action.payload;
    },
  },
});

export const { setOneNews } = oneNewsSlice.actions;
export default oneNewsSlice.reducer;
