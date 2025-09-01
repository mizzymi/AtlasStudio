import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
  selectedBlockId: string | null
  sidebarTab: 'blocks' | 'templates'
  showPreview: boolean
  siteName: string
}

const initialState: UIState = {
  selectedBlockId: null,
  sidebarTab: 'blocks',
  showPreview: false,
  siteName: 'Mi Sitio Web',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    selectBlock(state, action: PayloadAction<string | null>) {
      state.selectedBlockId = action.payload
    },
    setSidebarTab(state, action: PayloadAction<UIState['sidebarTab']>) {
      state.sidebarTab = action.payload
    },
    setShowPreview(state, action: PayloadAction<boolean>) {
      state.showPreview = action.payload
    },
    setSiteName(state, action: PayloadAction<string>) {
      state.siteName = action.payload
    },
    reset() {
      return initialState
    },
  },
})

export const { selectBlock, setSidebarTab, setShowPreview, setSiteName, reset } = uiSlice.actions
export default uiSlice.reducer
export type { UIState as uiState }