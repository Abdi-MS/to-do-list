import { Checkbox, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import React, { useRef } from "react";
import { useState } from "react";
import "./OneToDo.css";
import connectOneToDo from "./OneToDoContainer";

function OneToDo({ index, toDoList, editToDo, deleteToDo }) {
  const [editingToDo, setEditingToDo] = useState(false);
  const [toDoStatus, setToDoStatus] = useState(false);

  const editField = useRef();

  const editToDoHandler = () => {
    editToDo({
      text: editField.current.value,
      id: toDoList[index].id,
    });
  };

  const deleteToDoHandler = () => {
    deleteToDo({ delIndex: index, id: toDoList[index].id });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleEditButtonClick(event);
    }
  };

  const handleEditButtonClick = () => {
    if (editingToDo === false) {
      setEditingToDo(true);
    } else {
      setEditingToDo(false);
      editToDoHandler();
    }
  };

  const handleToDoStatus = () => {
    setToDoStatus(!toDoStatus);
    editToDo({
      checked: toDoStatus,
      id: toDoList[index].id,
    });
  };

  return (
    <div className="one-to-do">
      <div className="left-side">
        {editingToDo === true ? (
          <div>
            <TextField
              id="text-slot"
              defaultValue={toDoList[index].text}
              variant="outlined"
              inputRef={editField}
              onKeyDown={handleKeyPress}></TextField>
          </div>
        ) : (
          <div className="left-side">
            <Checkbox
              className="left-side-checkbox"
              checked={!toDoList[index].checked}
              onChange={handleToDoStatus}
            />
            <Typography
              id="text-slot"
              onClick={handleToDoStatus}
              className={!toDoList[index].checked ? "textChecked todo-text" : "todo-text"}>
              {toDoList[index].text}
            </Typography>
          </div>
        )}
      </div>
      <div className="right-half">
        <div className="right-half-btn-container">
          <IconButton
            className="btns-lol"
            color="primary"
            size="small"
            onClick={handleEditButtonClick}>
            {editingToDo ? (
              <SaveIcon fontSize="small" className="icon-btn" />
            ) : (
              <EditIcon fontSize="small" className="icon-btn" />
            )}
          </IconButton>
          <IconButton
            className="btns-lol"
            color="error"
            size="small"
            onClick={() => {
              deleteToDoHandler();
            }}>
            <DeleteIcon fontSize="small" className="icon-btn" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default connectOneToDo(OneToDo);
