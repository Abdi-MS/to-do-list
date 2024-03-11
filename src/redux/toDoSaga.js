import { call, put, takeEvery } from "redux-saga/effects";
import { loadToDos } from "./toDoSlice/toDoSlice";
import {
  getToDoById,
  getToDosFromJSON,
  postToDoToJSON,
  putToDoInJSON,
  deleteToDoFromJSON,
} from "../api/todoAPIs";

function* addToDoJSON(action) {
  const { payload } = action;
  yield call(() => postToDoToJSON(payload));
}

function* editToDoInJSON(action) {
  const { id, text, checked } = action?.payload;
  const object = yield call(() => getToDoById(id));
  if (text) {
    object.text = text;
  } else {
    object.checked = checked;
  }
  yield call(() => putToDoInJSON(id, object));
}

function* deleteToDoInJSON(action) {
  const { id } = action.payload;
  yield call(() => deleteToDoFromJSON(id));
}

function* loadDataFromJSON() {
  const data = yield call(() => getToDosFromJSON());
  yield put(loadToDos(data));
}

function* toDoSaga() {
  yield takeEvery("toDo/addToDo", addToDoJSON);
  yield takeEvery("toDo/startedApp", loadDataFromJSON);
  yield takeEvery("toDo/editToDo", editToDoInJSON);
  yield takeEvery("toDo/deleteToDo", deleteToDoInJSON);
}

export default toDoSaga;
