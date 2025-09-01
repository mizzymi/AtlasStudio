import type { uiState } from './UI.slice'

export const selectUI = (state: { ui: uiState }) => state.ui
export const selectSelectedBlockId = (state: { ui: uiState }) => state.ui.selectedBlockId
export const selectSidebarTabValue = (state: { ui: uiState }) => state.ui.sidebarTab
export const selectShowPreviewValue = (state: { ui: uiState }) => state.ui.showPreview
export const selectSiteName = (state: { ui: uiState }) => state.ui.siteName
