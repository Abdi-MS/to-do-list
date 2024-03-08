import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { loadToDos } from "./toDoSlice/toDoSlice";
import {
  getToDoById,
  getToDosFromJSON,
  postToDoToJSON,
  putToDoInJSON,
  deleteToDoFromJSON,
} from "./sagaAPIs";

function* addToDoJSON(action) {
  const { payload } = action;
  yield call(() => postToDoToJSON(payload));
}

function* editToDoInJSON(action) {
  const { id, newToDo } = action.payload;
  yield call(() => putToDoInJSON(id, newToDo));
}

function* deleteToDoInJSON(action) {
  const { id } = action.payload;
  yield call(() => deleteToDoFromJSON(id));
}

function* loadDataFromJSON() {
  console.log("data >>> ");
  const data = yield call(() => getToDosFromJSON());
  console.log(data);
  yield put(loadToDos(data));
}

function* toggleCheckInJSON(action) {
  const { id, status } = action.payload;
  const object = yield call(() => getToDoById(id));
  console.log("object before >>> ")
  console.log(object)
  console.log("changing status to >>> ", status)
  object.checked = status;
  console.log("object after >>> ")
  console.log(object)
  yield call(() => putToDoInJSON(id, object));
}

function* toDoSaga() {
  yield takeEvery("toDo/addToDo", addToDoJSON);
  yield takeEvery("toDo/startedApp", loadDataFromJSON);
  yield takeEvery("toDo/editToDo", editToDoInJSON);
  yield takeEvery("toDo/deleteToDo", deleteToDoInJSON);
  yield takeEvery("toDo/toggleCheck", toggleCheckInJSON);
}

export default toDoSaga;
