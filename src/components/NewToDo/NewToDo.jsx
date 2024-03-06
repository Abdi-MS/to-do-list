import React, { useState } from "react";
import { TextField } from "@mui/material";
import "./NewToDo.css";
import { useDispatch } from "react-redux";
import { reduxAddToDo } from "../../redux/toDoSlice/toDoSlice";

const NewToDo = () => {
  const [newToDo, setNewTodo] = useState("");
  const dispatch = useDispatch();

  const addToDo = (message) => {
    dispatch(reduxAddToDo(message));
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
