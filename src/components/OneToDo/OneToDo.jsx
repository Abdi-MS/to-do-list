import { Checkbox, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import React, { useRef } from "react";
import { useState } from "react";
import "./OneToDo.css";
import { connect } from "react-redux";
import {
  editToDo as reduxEditToDo,
  deleteToDo as reduxDeleteToDo,
} from "../../redux/toDoSlice/toDoSlice";

function OneToDo({ index, toDoList, reduxEditToDo, reduxDeleteToDo }) {
  const [editingToDo, setEditingToDo] = useState(false);
  const [toDoStatus, setToDoStatus] = useState(false);

  // const dispatch = useDispatch();

  // const reduxToDoList = useSelector((state) => {
  //   return state.toDo.toDoList;
  // });

  const editField = useRef();

  const editToDo = () => {
    // dispatch(
    //   edit({
    //     text: editField.current.value,
    //     id: toDoList[index].id,
    //   })
    // );
    reduxEditToDo({
      text: editField.current.value,
      id: toDoList[index].id,
    });
  };

  const deleteToDo = () => {
    reduxDeleteToDo({ delIndex: index, id: toDoList[index].id });
    // dispatch(reduxDeleteToDo({ delIndex: index, id: toDoList[index].id }));
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
      editToDo();
    }
  };

  const handleToDoStatus = () => {
    setToDoStatus(!toDoStatus);
    // dispatch(
    //   reduxEditToDo({
    //     checked: toDoStatus,
    //     id: toDoList[index].id,
    //   })
    // );
    reduxEditToDo({
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
              className={toDoStatus ? "textChecked todo-text" : "todo-text"}>
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
              deleteToDo();
            }}>
            <DeleteIcon fontSize="small" className="icon-btn" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    toDoList: state.toDo.toDoList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editToDo: (id, text) => dispatch(reduxEditToDo({ id, text })),
    deleteToDo: (delIndex, id) => dispatch(reduxDeleteToDo({ delIndex, id })),
  };
};

export default connect(mapStateToProps)(OneToDo);
