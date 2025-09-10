import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUI = createAsyncThunk(
  'UI/fetch',
  async (_: void, _thunkApi) => {
    return null
  }
)
