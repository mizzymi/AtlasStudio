import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUI = createAsyncThunk(
  'UI/fetch',
  async (_: void, _thunkApi) => {
    // TODO: implement async logic
    return null
  }
)
