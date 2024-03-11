import React, { useState } from "react";
import { TextField } from "@mui/material";
import "./NewToDo.css";
import { v4 as uuidv4 } from "uuid";
import connectNewToDo from "../containers/NewToDoContainer";

const NewToDo = ({ reduxAddToDo }) => {
  const [newToDo, setNewTodo] = useState("");

  const addToDo = (text) => {
    const newToDoObj = {
      id: uuidv4(),
      text: text,
      checked: true,
    };
    reduxAddToDo(newToDoObj);
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
