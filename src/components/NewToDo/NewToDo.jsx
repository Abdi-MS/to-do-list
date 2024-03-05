import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./NewToDo.css";

const NewToDo = ({ addToDo }) => {
  const [newToDo, setNewTodo] = useState("");
  const [btnHover, setBtnHover] = useState("false");
  const [btnType, setBtnType] = useState("outlined");

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

  const handleBtnHover = (message) => {
    message === "leave" ? setBtnHover(true) : setBtnHover(false);
    if (btnHover) {
      setBtnType("contained");
    } else {
      setBtnType("outlined");
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
        {/* <div className="todo-input-btn-container">
          <Button
            className="todo-input-button"
            variant={btnType}
            color="success"
            endIcon={<SendIcon />}
            onMouseEnter={() => handleBtnHover("enter")}
            onMouseLeave={() => handleBtnHover("leave")}
            onClick={handleNewToDo}>
            Add To-Do
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default NewToDo;
