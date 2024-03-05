import {
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import React, { useEffect } from "react";
import { useState } from "react";
import "./OneToDo.css";

function OneToDo({ toDo, editToDo, deleteToDo, index }) {
  const [editingToDo, setEditingToDo] = useState(false);
  const [editField, setEditField] = useState("");
  const [toDoStatus, setToDoStatus] = useState(false);

  useEffect(() => {
    setEditField(toDo);
  }, [toDo]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleEditButtonClick();
    }
  };

  const updateEditField = (event) => {
    setEditField(event.target.value);
  };

  const handleEditButtonClick = () => {
    if (editingToDo == false) {
      setEditingToDo(true);
    } else {
      setEditingToDo(false);
      editToDo(index, editField);
    }
  };

  const handleToDoStatus = () => {
    setToDoStatus(!toDoStatus);
  };

  return (
    <div className="one-to-do">
      <div className="left-side">
        {!editingToDo ? (
          <Checkbox
            className="left-side-checkbox"
            checked={toDoStatus}
            onChange={handleToDoStatus}
          />
        ) : (
          <div></div>
        )}
        {editingToDo == true ? (
          <div>
            <TextField
              id="text-slot"
              value={editField}
              variant="outlined"
              onChange={updateEditField}
              onKeyDown={handleKeyPress}></TextField>
          </div>
        ) : (
          <div>
            <Typography
              id="text-slot"
              onClick={handleToDoStatus}
              className={toDoStatus ? "textChecked todo-text" : "todo-text"}>
              {toDo}
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
              deleteToDo(index);
            }}>
            <DeleteIcon fontSize="small" className="icon-btn" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default OneToDo;
