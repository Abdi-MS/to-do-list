import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "./toDoSlice/toDoSlice";
import createSagaMiddleware from "@redux-saga/core";
import toDoSaga from "./toDoSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    toDo: toDoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(toDoSaga);

export default store;
