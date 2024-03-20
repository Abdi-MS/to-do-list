import { Checkbox, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import React, { KeyboardEventHandler, useRef } from "react";
import { useState } from "react";
import "./OneToDo.css";
import { useDispatch, useSelector } from "react-redux";
import {
  editToDo as reduxEditToDo,
  deleteToDo as reduxDeleteToDo,
} from "../../redux/toDoSlice/toDoSlice";
import { RootState } from "../../redux/store";

type OneToDoProps = {
  index: number;
};

const OneToDo: React.FC<OneToDoProps> = ({ index }) => {
  const [editingToDo, setEditingToDo] = useState(false);

  const dispatch = useDispatch();

  const reduxToDoList = useSelector((state: RootState) => {
    return state.toDo.toDoList;
  });

  const editField = useRef<HTMLInputElement>();

  const editToDo = () => {
    dispatch(
      reduxEditToDo({
        text: editField.current?.value,
        id: reduxToDoList[index].id,
      })
    );
  };

  const deleteToDo = () => {
    dispatch(reduxDeleteToDo({ delIndex: index, id: reduxToDoList[index].id }));
  };

  const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      handleEditButtonClick();
    }
  };

  const handleEditButtonClick = () => {
    if (editingToDo === false) {
      setEditingToDo(true);
    } else {
      setEditingToDo(false);
      editToDo();
    }
  };

  const handleToDoStatus = () => {
    dispatch(
      reduxEditToDo({
        checked: !reduxToDoList[index].checked,
        id: reduxToDoList[index].id,
      })
    );
  };

  return (
    <div className="one-to-do">
      <div className="left-side">
        {editingToDo === true ? (
          <div>
            <TextField
              id="text-slot"
              defaultValue={reduxToDoList[index].text}
              variant="outlined"
              inputRef={editField}
              onKeyDown={handleKeyPress}></TextField>
          </div>
        ) : (
          <div className="left-side">
            <Checkbox
              className="left-side-checkbox"
              checked={reduxToDoList[index].checked}
              onChange={handleToDoStatus}
            />
            <Typography
              id="text-slot"
              onClick={handleToDoStatus}
              className={
                reduxToDoList[index].checked
                  ? "textChecked todo-text"
                  : "todo-text"
              }>
              {reduxToDoList[index].text}
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
};

export default OneToDo;
