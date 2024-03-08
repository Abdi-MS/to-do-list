import { createSlice } from "@reduxjs/toolkit";

const toDoSlice = createSlice({
  name: "toDo",
  initialState: {
    toDoList: [],
  },
  reducers: {
    startedApp: (state) => {
      console.log("app started");
    },
    loadToDos: (state, action) => {
      state.toDoList = [...action.payload];
    },
    addToDo: (state, action) => {
      state.toDoList.push(action.payload);
    },
    editToDo: (state, action) => {
      const { index, newToDo, id } = action.payload;
      state.toDoList[index] = newToDo;
    },
    deleteToDo: (state, action) => {
      const { delIndex } = action.payload;
      state.toDoList.splice(delIndex, 1);
    },
    toggleCheck: (state, action) => {
      const { id, status } = action.payload;
      const tempObject = state.toDoList.find((obj) => obj.id === id);
      tempObject.checked = status;
    },
  },
});

export const {
  startedApp,
  loadToDos,
  toggleCheck,
  addToDo,
  editToDo,
  deleteToDo,
} = toDoSlice.actions;
export default toDoSlice.reducer;
