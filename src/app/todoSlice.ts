import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  text: string;
  status: "open" | "completed";
}

export interface TodoState {
  list: Todo[];
  nextId: number;
}

const initialState: TodoState = {
  list: [],
  nextId: 1,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: state.nextId,
        text: action.payload,
        status: "open",
      };

      state.nextId += 1;
      state.list = [...state.list, newTodo];
    },

    remove: (state, action: PayloadAction<number>) => {
      state.list = state.list.reduce((p, n) => {
        if (n.id != action.payload) p.push(n);
        return p;
      }, [] as Todo[]);
    },

    clear: (state) => {
      state.list = [];
      state.nextId = 1;
    },

    toggleStatus: (state, action: PayloadAction<number>) => {
      state.list = state.list.map((todo) => {
        if (todo.id == action.payload) {
          todo.status = todo.status == "open" ? "completed" : "open";
        }
        return todo;
      });
    },

    clearCompleted: (state) => {
      state.list = state.list.filter((todo) => todo.status != "completed");
    },

    reorderById: (state) => {
      const sorted = state.list.some((todo, i, a) => {
        if (i == 0) return false;
        return todo.id < a[i - 1].id;
      });
      if (sorted) state.list = state.list.sort((a, b) => a.id - b.id);
      else state.list = state.list.sort((a, b) => b.id - a.id);
    },

    reorderByStatus: (state) => {
      const sorted = state.list.some((todo, i, a) => {
        if (i == 0) return false;
        return todo.status == "open" && a[i - 1].status == "completed";
      });
      if (sorted)
        state.list = state.list.sort((a, b) => (a.status == "open" ? -1 : 1));
      else
        state.list = state.list.sort((a, b) => (a.status == "open" ? 1 : -1));
    },

    swap: (state, action: PayloadAction<{ one: number; other: number }>) => {
      const { one, other } = action.payload;
      const clone = [...state.list];
      const temp = clone[one];
      clone[one] = clone[other];
      clone[other] = temp;
      state.list = clone;
    },
  },
});

export const {
  add,
  remove,
  clear,
  clearCompleted,
  toggleStatus,
  reorderById,
  reorderByStatus,
  swap,
} = todoSlice.actions;

export default todoSlice.reducer;
