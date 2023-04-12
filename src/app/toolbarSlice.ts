import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ToolbarState {
  searchText: string
  showCompleted: boolean
}

const initialState: ToolbarState = {
  searchText: '',
  showCompleted: true
}

export const toolbarSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    },

    toggleShowCompleted: (state) => {
      state.showCompleted = !state.showCompleted
    }
  },
})

export const { updateSearch, toggleShowCompleted } = toolbarSlice.actions

export default toolbarSlice.reducer