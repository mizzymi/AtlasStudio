import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Block } from '@/types/blocks'

export const fetchblocks = createAsyncThunk<Block[], void>(
  'blocks/fetch',
  async (_: void, _thunkApi) => {
    // TODO: implement async logic
    return []
  }
)