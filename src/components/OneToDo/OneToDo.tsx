import { Checkbox, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import React, { KeyboardEventHandler, useRef } from "react";
import { useState } from "react";
import "./OneToDo.css";
import { useToDoList, editToDo, deleteToDo } from "../../store/store";
import { EditedTodoObj } from "../../../types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { deleteToDoFromJSON, putToDoInJSON } from "../../api/todoAPIs";

export type OneToDoProps = {
  index: number;
};

type FormData = {
  ToDoField: string;
};

const OneToDo: React.FC<OneToDoProps> = ({ index }) => {
  const editMutation = useMutation({
    mutationFn: (editedToDo: EditedTodoObj) => {
      return putToDoInJSON({ id: editedToDo.id, newToDo: editedToDo });
    },
    mutationKey: ["editToDo"],
  });

  const deleteMutation = useMutation({
    mutationKey: ["deleteToDo"],
    mutationFn: (id: string) => deleteToDoFromJSON(id),
  });

  const [editingToDo, setEditingToDo] = useState(false);

  const editField = useRef();
  const toDoList = useToDoList().toDoList;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (editingToDo === false) {
      setEditingToDo(true);
    } else {
      setEditingToDo(false);
      const editedToDo: EditedTodoObj = {
        text: data.ToDoField,
        id: toDoList[index].id,
      };
      editToDo(editedToDo);
      editMutation.mutate(editedToDo);
    }
  };

  const deleteToDoHandler = () => {
    deleteMutation.mutate(toDoList[index].id);
    const deletionObj = { delIndex: index, id: toDoList[index].id };
    deleteToDo(deletionObj);
  };

  const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit);
    }
  };

  const handleToDoStatus = () => {
    const editedToDo = {
      checked: !toDoList[index].checked,
      id: toDoList[index].id,
    };
    editToDo(editedToDo);
    editMutation.mutate(editedToDo);
  };

  return (
    <div className="one-to-do">
      <div className="left-side">
        {editingToDo === true ? (
          <div>
            <form
              className="new-todo-container"
              onSubmit={handleSubmit(onSubmit)}>
              <TextField
                id="text-slot"
                defaultValue={toDoList[index].text}
                inputRef={editField}
                variant="outlined"
                onKeyDown={handleKeyPress}
                {...register("ToDoField", {
                  required: "To-Do can't be empty",
                  minLength: {
                    value: 1,
                    message: "To-Do can't be empty",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9-\s]+$/,
                    message:
                      "Please only enter letters of english alphabet and/or numbers",
                  },
                })}
              />
              {errors.ToDoField && (
                <p className="errorMsg">{errors.ToDoField.message}</p>
              )}
            </form>
          </div>
        ) : (
          <div className="left-side">
            <Checkbox
              className="left-side-checkbox"
              checked={toDoList[index].checked}
              onChange={handleToDoStatus}
            />
            <Typography
              id="text-slot"
              onClick={handleToDoStatus}
              className={
                !toDoList[index].checked
                  ? " todo-text"
                  : "todo-text textChecked"
              }>
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
            onClick={handleSubmit(onSubmit)}>
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
};

export default OneToDo;
