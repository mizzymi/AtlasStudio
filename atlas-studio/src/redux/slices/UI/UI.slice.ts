import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UILang =
  | 'es' | 'en' | 'pt' | 'fr' | 'de' | 'it' | 'nl' | 'pl' | 'ja' | 'zh' | 'ar';

export interface UIState {
  selectedBlockId: string | null;
  sidebarTab: 'blocks' | 'templates';
  showPreview: boolean;
  siteName: string;
  theme: { primary: string; secondary: string };
  lang: UILang;
  showSettings: boolean;
}

const initialState: UIState = {
  selectedBlockId: null,
  sidebarTab: 'blocks',
  showPreview: false,
  siteName: 'Mi Sitio Web',
  theme: { primary: '#667eea', secondary: '#764ba2' },
  lang: 'es',
  showSettings: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    selectBlock(state, action: PayloadAction<string | null>) {
      state.selectedBlockId = action.payload;
    },
    setSidebarTab(state, action: PayloadAction<UIState['sidebarTab']>) {
      state.sidebarTab = action.payload;
    },
    setShowPreview(state, action: PayloadAction<boolean>) {
      state.showPreview = action.payload;
    },
    setSiteName(state, action: PayloadAction<string>) {
      state.siteName = action.payload;
    },
    setTheme(state, action: PayloadAction<Partial<UIState['theme']>>) {
      state.theme = { ...state.theme, ...action.payload };
    },
    setLang(state, action: PayloadAction<UILang>) {
      state.lang = action.payload;
    },
    setShowSettings(state, action: PayloadAction<boolean>) {
      state.showSettings = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const {
  selectBlock,
  setSidebarTab,
  setShowPreview,
  setSiteName,
  setTheme,
  setLang,
  setShowSettings,
  reset,
} = uiSlice.actions;

export default uiSlice.reducer;
export type { UIState as uiState };
