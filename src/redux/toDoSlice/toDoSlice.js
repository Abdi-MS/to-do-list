import { createSlice } from "@reduxjs/toolkit";

const toDoSlice = createSlice({
  name: "toDo",
  initialState: {
    toDoList: [],
  },
  reducers: {
    addToDo: (state, action) => {
      state.toDoList.push(action.payload);
    },
    editToDo: (state, action) => {
      const { index, newToDo } = action.payload;
      state.toDoList[index] = newToDo;
    },
    deleteToDo: (state, action) => {
      const {delIndex} = action.payload;
      state.toDoList.splice(delIndex, 1);
    },
  },
});

export const {
  addToDo: reduxAddToDo,
  editToDo: reduxEditToDo,
  deleteToDo: reduxDeleteToDo,
} = toDoSlice.actions;
export default toDoSlice.reducer;
