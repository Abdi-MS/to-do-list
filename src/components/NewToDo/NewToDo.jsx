import React, { useState } from "react";
import { TextField } from "@mui/material";
import "./NewToDo.css";
import { useDispatch } from "react-redux";
import { addToDo as reduxAddToDo} from '../../redux/toDoSlice/toDoSlice.ts'
import {v4 as uuidv4} from 'uuid'

const NewToDo = ({ nextId }) => {
  const [newToDo, setNewTodo] = useState("");
  const dispatch = useDispatch();

  const addToDo = (text) => {
    const newToDoObj = {
      id: uuidv4(),
      text: text,
      checked: false,
    };
    dispatch(reduxAddToDo(newToDoObj));
  };

  const handleNewToDo = () => {
    if (newToDo !== "") {
      addToDo(newToDo.trim());
      setNewTodo("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleNewToDo();
    }
  };

  return (
    <div className="outter-container">
      <div className="new-todo-container">
        <TextField
          className="todo-input-field"
          id="NewToDo"
          label="Input task name and then press enter to add"
          variant="outlined"
          value={newToDo}
          onKeyDown={handleKeyPress}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default NewToDo;
