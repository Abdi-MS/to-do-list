import axios from "axios";
import { EditedTodoType, ToDoType } from "../../types/types";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getToDosFromDB = async () => {
  const response = await axios.get(`${BASE_URL}/toDos`);
  const data = response.data;
  return data;
};

const getToDoById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/toDos/${id}`);
  return response.data;
};

const postToDoToDB = async (toDo: ToDoType) => {
  await axios.post(`${BASE_URL}/toDos`, toDo);
};

const putToDoInDB = async ({
  id,
  newToDo,
}: {
  id: string;
  newToDo: EditedTodoType;
}) => {
  const tempToDo = await getToDoById(id);
  const updatedToDo = { ...tempToDo, ...newToDo };
  await axios.put(`${BASE_URL}/toDos/${id}`, updatedToDo);
};

const deleteToDoFromDB = async (id: string) => {
  await axios.delete(`${BASE_URL}/toDos/${id}`);
};

export {
  getToDosFromDB,
  getToDoById,
  postToDoToDB,
  putToDoInDB,
  deleteToDoFromDB,
};
