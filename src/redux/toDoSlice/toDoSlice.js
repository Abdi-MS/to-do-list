import { createSlice } from "@reduxjs/toolkit";

const toDoSlice = createSlice({
  name: "toDo",
  initialState: {
    toDoList: [],
  },
  reducers: {
    startedApp: (state) => {},
    loadToDos: (state, action) => {
      state.toDoList = [...action.payload];
    },
    addToDo: (state, action) => {
      state.toDoList.push(action.payload);
    },
    editToDo: (state, action) => {
      const { id, text, checked } = action?.payload;
      const index = state.toDoList.findIndex((toDo) => toDo.id === id);
      if (text) {
        state.toDoList[index].text = text;
      } else {
        state.toDoList[index].checked = checked;
      }
    },
    deleteToDo: (state, action) => {
      const { delIndex } = action.payload;
      state.toDoList.splice(delIndex, 1);
    },
  },
});

export const {
  startedApp,
  loadToDos,
  addToDo,
  editToDo,
  deleteToDo,
} = toDoSlice.actions;
export default toDoSlice.reducer;
