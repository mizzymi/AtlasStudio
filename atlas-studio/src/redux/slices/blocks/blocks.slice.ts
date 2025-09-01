import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Block } from '@/types/blocks'
import { fetchblocks } from './thunks'

export interface blocksState {
  items: any
  data: Block[]
  loading: boolean
  error: string | null
}

const initialState: blocksState = {
  data: [],
  loading: false,
  error: null,
}

export const blocksSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Block[]>) {
      state.data = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    reset() {
      return initialState
    },
    addBlock(state, action: PayloadAction<Block>) {
      state.data.push(action.payload)
    },
    updateBlock(state, action: PayloadAction<Block>) {
      state.data = state.data.map(b => (b.id === action.payload.id ? action.payload : b))
    },
    deleteBlock(state, action: PayloadAction<string>) {
      state.data = state.data.filter(b => b.id !== action.payload)
    },
    moveBlock(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      const len = state.data.length;
      if (from === to || from < 0 || from >= len) return;
      const next = state.data.slice();
      const [moved] = next.splice(from, 1);
      if (moved === undefined) return;
      const toClamped = Math.max(0, Math.min(to, next.length));
      next.splice(toClamped, 0, moved);
      state.data = next;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchblocks.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchblocks.fulfilled, (state, action: PayloadAction<Block[]>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchblocks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Unknown error'
      })
  },
})

export const {
  setData,
  setLoading,
  setError,
  reset,
  addBlock,
  updateBlock,
  deleteBlock,
  moveBlock,
} = blocksSlice.actions

export default blocksSlice.reducer