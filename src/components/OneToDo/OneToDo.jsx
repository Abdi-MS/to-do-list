import { Button, Checkbox, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import React, { useEffect } from "react";
import { useState } from "react";
import "./OneToDo.css";

function OneToDo({ toDo, editToDo, deleteToDo, index }) {
  const [editingToDo, setEditingToDo] = useState(false);
  const [editField, setEditField] = useState("");
  const [editBtnText, setEditBtnText] = useState("Edit");
  const [editBtnIcon, setEditBtnIcon] = useState(<EditIcon />);
  const [editHover, setEditHover] = useState("false");
  const [deleteHover, setDeleteHover] = useState("false");
  const [editVariant, setEditVariant] = useState("outlined");
  const [deleteVariant, setDeleteVariant] = useState("outlined");
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
      setEditBtnIcon(<SaveIcon />);
      setEditBtnText("Save Changes");
    } else {
      setEditingToDo(false);
      setEditBtnIcon(<EditIcon />);
      setEditBtnText("Edit");
      editToDo(index, editField);
    }
  };

  const handleToDoStatus = () => {
    setToDoStatus(!toDoStatus);
  };

  const handleEditHover = (message) => {
    message === "enter" ? setEditHover(false) : setEditHover(true);
    console.log("edithover >>> ", editHover);
    console.log("message >>>", message);
    if (editHover) {
      setEditVariant("contained");
    } else {
      setEditVariant("outlined");
    }
  };

  const handleDeleteHover = (message) => {
    message === "enter" ? setDeleteHover(false) : setDeleteHover(true);
    if (deleteHover) {
      setDeleteVariant("contained");
    } else {
      setDeleteVariant("outlined");
    }
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
          <Button
            className="btns-lol"
            variant={editVariant}
            color="primary"
            size="small"
            onMouseLeave={() => {
              handleEditHover("leave");
            }}
            onMouseEnter={() => {
              handleEditHover("enter");
            }}
            endIcon={editBtnIcon}
            onClick={handleEditButtonClick}>
            {/* {editingToDo ? "Save" : "Edit"} */}
            ''
          </Button>
          <Button
            className="btns-lol"
            variant={deleteVariant}
            color="error"
            size="small"
            onMouseLeave={() => {
              handleDeleteHover("leave");
            }}
            onMouseEnter={() => {
              handleDeleteHover("enter");
            }}
            endIcon={<DeleteIcon />}
            onClick={() => {
              deleteToDo(index);
            }}>
            {/* Delete */}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OneToDo;
