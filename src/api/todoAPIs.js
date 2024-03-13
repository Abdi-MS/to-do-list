import axios from "axios";

const BASE_URL = "http://localhost:8000";

const getToDosFromJSON = async () => {
  const response = await axios.get(`${BASE_URL}/toDos`);
  const data = response.data;
  return data;
};

const getToDoById = async (id) => {
  const response = await axios.get(`${BASE_URL}/toDos/${id}`);
  return response.data;
};

const postToDoToJSON = async (toDo) => {
  await axios.post(`${BASE_URL}/toDos`, toDo);
};

const putToDoInJSON = async ({ id, newToDo }) => {
  await axios.put(`${BASE_URL}/toDos/${id}`, newToDo);
};

const deleteToDoFromJSON = async (id) => {
  await axios.delete(`${BASE_URL}/toDos/${id}`);
};

export {
  getToDosFromJSON,
  getToDoById,
  postToDoToJSON,
  putToDoInJSON,
  deleteToDoFromJSON,
};
