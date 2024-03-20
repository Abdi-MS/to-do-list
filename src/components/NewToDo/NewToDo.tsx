import React from "react";
import { TextField } from "@mui/material";
import "./NewToDo.css";
import { v4 as uuidv4 } from "uuid";
import { addToDo } from "../../store/store";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postToDoToJSON } from "../../api/todoAPIs";
import { ToDo } from "../../../types/types";
import { SubmitHandler } from "react-hook-form";

type FormData = {
  ToDoField: string;
};

const NewToDo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data,event?) => {    
    const toDoText = data.ToDoField;
    if (toDoText !== "") {
      const text = toDoText.trim();
      const newToDoObj = {
        id: uuidv4(),
        text: text,
        checked: false,
      };
      addToDo(newToDoObj);
      addMutation.mutate(newToDoObj);
    }
    event?.target.reset();
  };

  const addMutation = useMutation({
    mutationKey: ["addToDo"],
    mutationFn: (newToDo: ToDo) => postToDoToJSON(newToDo),
  });

  return (
    <div className="outter-container">
      <div className="new-todo-container">
        <form className="new-todo-container" onSubmit={handleSubmit(onSubmit)}>
          <div className="enterToDo">
            <TextField
              autoComplete="off"
              className="todo-input-field"
              id="NewToDo"
              placeholder="Input task name and then press enter"
              variant="outlined"
              {...register("ToDoField", {
                required: "Field is required",
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
            <input className="btn" type="submit" />
          </div>
          {errors.ToDoField && (
            <p className="errorMsg">{String(errors.ToDoField.message)}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewToDo;
