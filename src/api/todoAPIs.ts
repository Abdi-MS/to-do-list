import axios from "axios";
import { ToDo } from "../store/store";

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
  const addedToDo = await axios.post(`${BASE_URL}/toDos`, toDo);
};

const putToDoInJSON = async ({
  id,
  newToDo,
}: {
  id: string;
  newToDo: ToDo;
}) => {
  const tempToDo = await getToDoById(id);
  const entryToDo = { ...tempToDo, ...newToDo };
  await axios.put(`${BASE_URL}/toDos/${id}`, entryToDo);
};

const deleteToDoFromJSON = async (id:string) => {
  let temp = await getToDosFromJSON();
  await axios.delete(`${BASE_URL}/toDos/${id}`);
  temp = await getToDosFromJSON();
};

export {
  getToDosFromJSON,
  getToDoById,
  postToDoToJSON,
  putToDoInJSON,
  deleteToDoFromJSON,
};