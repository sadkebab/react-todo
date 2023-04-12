import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ToolbarState {
  searchText: string
}

const initialState: ToolbarState = {
  searchText: ''
}

export const toolbarSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    },
  },
})

export const { updateSearch } = toolbarSlice.actions

export default toolbarSlice.reducer