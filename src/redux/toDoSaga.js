import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { loadToDos } from "./toDoSlice/toDoSlice";

function* addToDoJSON(action) {
  const { payload } = action;
  yield call(() => axios.post("http://localhost:8000/toDos", payload));
}

function* editToDoInJSON(action) {
  const { id, newToDo } = action.payload;
  yield call(() => {
    axios.put(`http://localhost:8000/toDos/${id}`, newToDo);
  });
}

function* deleteToDoInJSON(action) {
  const { id } = action.payload;
  yield call(() => {
    axios.delete(`http://localhost:8000/toDos/${id}`);
  });
}

function* loadDataFromJSON() {
  const data = yield call(() => {
    return axios.get("http://localhost:8000/toDos");
  });
  const formattedData = yield data.data;
  yield put(loadToDos(formattedData));
}

function* toggleCheckInJSON(action) {
  const { id, status } = action.payload;
  const obj = yield call(() => {
    return axios.get(`http://localhost:8000/toDos/${id}`);
  });
  obj.data.checked = status;
  yield call(() => {
    axios.put(`http://localhost:8000/toDos/${id}`, obj.data);
  });
}

function* toDoSaga() {
  yield takeEvery("toDo/addToDo", addToDoJSON);
  yield takeEvery("toDo/startedApp", loadDataFromJSON);
  yield takeEvery("toDo/editToDo", editToDoInJSON);
  yield takeEvery("toDo/deleteToDo", deleteToDoInJSON);
  yield takeEvery("toDo/toggleCheck", toggleCheckInJSON);
}

export default toDoSaga;
