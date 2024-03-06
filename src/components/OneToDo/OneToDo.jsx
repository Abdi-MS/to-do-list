import { Checkbox, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import React, { useEffect } from "react";
import { useState } from "react";
import "./OneToDo.css";
import { useDispatch, useSelector } from "react-redux";
import { reduxEditToDo, reduxDeleteToDo } from "../../redux/toDoSlice/toDoSlice";

function OneToDo({ index }) {
  const [toDo, setToDo] = useState("");
  const [editingToDo, setEditingToDo] = useState(false);
  const [editField, setEditField] = useState("");
  const [toDoStatus, setToDoStatus] = useState(false);

  const dispatch = useDispatch();
  const reduxToDoList = useSelector((state) => {
    return state.toDo.toDoList;
  });

  useEffect(() => {
    setToDo(reduxToDoList[index]);
    setEditField(toDo);
  }, [editingToDo]);

  const editToDo=()=>{
    dispatch(reduxEditToDo({index:index, newToDo:editField}))
  }

  const deleteToDo=()=>{
    dispatch(reduxDeleteToDo({delIndex:index}))
  }

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
      editToDo();
    }
  };

  const handleToDoStatus = () => {
    setToDoStatus(!toDoStatus);
  };

  return (
    <div className="one-to-do">
      <div className="left-side">
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
          <div className="left-side">
            <Checkbox
              className="left-side-checkbox"
              checked={toDoStatus}
              onChange={handleToDoStatus}
            />
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
              deleteToDo();
            }}>
            <DeleteIcon fontSize="small" className="icon-btn" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default OneToDo;
