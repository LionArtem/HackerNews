import { configureStore } from '@reduxjs/toolkit';
import news from './slices/oneNews';

export const store = configureStore({
  reducer: { news },
});
