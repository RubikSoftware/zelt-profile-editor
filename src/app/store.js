import { configureStore } from '@reduxjs/toolkit';
import personalReducer from '../features/profile/personalSlice';
import contractReducer from '../features/profile/contractSlice';

export default configureStore({
  reducer: {
    personal: personalReducer,
    contract: contractReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
