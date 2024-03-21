import axios from "axios";
import { EditedTodoObj, ToDo } from "../types/types";

const BASE_URL = "http://localhost:8000";

const getToDosFromJSON = async () => {
  const response = await axios.get(`${BASE_URL}/toDos`);
  const data = response.data;
  return data;
};

const getToDoById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/toDos/${id}`);
  return response.data;
};

const postToDoToJSON = async (toDo: ToDo) => {
  await axios.post(`${BASE_URL}/toDos`, toDo);
};

const putToDoInJSON = async ({
  id,
  newToDo,
}: {
  id: string;
  newToDo: EditedTodoObj;
}) => {
  const tempToDo = await getToDoById(id);
  const entryToDo = { ...tempToDo, ...newToDo };
  await axios.put(`${BASE_URL}/toDos/${id}`, entryToDo);
};

const deleteToDoFromJSON = async (id: string) => {
  await axios.delete(`${BASE_URL}/toDos/${id}`);
};

export {
  getToDosFromJSON,
  getToDoById,
  postToDoToJSON,
  putToDoInJSON,
  deleteToDoFromJSON,
};
