import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Todo {
  id: number,
  text: string
}

export interface TodoState {
  list: Todo[],
  nextId: number
}

const initialState: TodoState = {
  list: [],
  nextId: 1
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: state.nextId,
        text: action.payload
      }

      state.nextId += 1
      state.list = [...state.list, newTodo]
    },
    
    remove: (state, action: PayloadAction<number>) => {
      state.list = state.list.reduce((p, n) => {
        if (n.id != action.payload) p.push(n)
        return p
      }, [] as Todo[])
    },

    clear: (state) => {
      state.list = []
      state.nextId = 1
    }
  },
})

export const { add, remove, clear } = todoSlice.actions

export default todoSlice.reducer