import { configureStore } from '@reduxjs/toolkit';
import blocks from './slices/blocks/blocks.slice';
import ui from './slices/UI/UI.slice';


export const store = configureStore({
reducer: { blocks, ui },
devTools: true,
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;