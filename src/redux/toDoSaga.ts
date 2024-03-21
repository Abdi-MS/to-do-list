import { call, put, takeEvery } from "redux-saga/effects";
import { loadToDos } from "./toDoSlice/toDoSlice";
import {
  getToDoById,
  getToDosFromJSON,
  postToDoToJSON,
  putToDoInJSON,
  deleteToDoFromJSON,
} from "../api/todoAPIs";
import { EditedTodoObj, ToDo } from "../types/types";
import { PayloadAction } from "@reduxjs/toolkit";

function* addToDoJSON(action: PayloadAction<ToDo>): Generator<any, void, any> {
  const { payload } = action;
  yield call(() => postToDoToJSON(payload));
}

function* editToDoInJSON(
  action: PayloadAction<EditedTodoObj>
): Generator<any, void, any> {
  const { id, text, checked } = action?.payload;
  console.log(action.payload);
  const object = yield call(() => getToDoById(id));
  if (text) {
    object.text = text;
  } else {
    object.checked = checked;
  }
  yield call(() => putToDoInJSON({ id, newToDo: object }));
}

function* deleteToDoInJSON(
  action: PayloadAction<{ id: string }>
): Generator<any, void, any> {
  const { id } = action.payload;
  yield call(() => deleteToDoFromJSON(id));
}

function* loadDataFromJSON(): Generator<any, void, any> {
  const data = yield call(() => getToDosFromJSON());
  yield put(loadToDos(data));
}

function* toDoSaga(): Generator<any, void, any> {
  yield takeEvery("toDo/addToDo", addToDoJSON);
  yield takeEvery("toDo/startedApp", loadDataFromJSON);
  yield takeEvery("toDo/editToDo", editToDoInJSON);
  yield takeEvery("toDo/deleteToDo", deleteToDoInJSON);
}

export default toDoSaga;
