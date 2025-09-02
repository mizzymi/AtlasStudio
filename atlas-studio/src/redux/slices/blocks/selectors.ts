import type { blocksState } from './blocks.slice';

export const selectblocks = (state: { blocks?: blocksState }) => state.blocks;
export const selectblocksData = (state: { blocks?: blocksState }) => state.blocks?.data ?? [];
export const selectblocksLoading = (state: { blocks?: blocksState }) => state.blocks?.loading ?? false;
export const selectblocksError = (state: { blocks?: blocksState }) => state.blocks?.error ?? null;
