import React, { useState } from "react";
import { TextField } from "@mui/material";
import "./NewToDo.css";
import { v4 as uuidv4 } from "uuid";
import { addToDo as reduxAddToDo } from "../../store/store";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postToDoToJSON } from "../../api/todoAPIs";

const NewToDo = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    handleNewToDo(data.ToDoField);
    e.target.reset();
  };

  const addMutation = useMutation({
    mutationKey: ["addToDo"],
    mutationFn: (newToDo) => postToDoToJSON(newToDo),
  });

  const addToDo = (text) => {
    const newToDoObj = {
      id: uuidv4(),
      text: text,
      checked: true,
    };
    reduxAddToDo(newToDoObj);
    addMutation.mutate(newToDoObj);
  };

  const handleNewToDo = (str) => {
    if (str !== "") {
      addToDo(str.trim());
    }
  };

  return (
    <div className="outter-container">
      <div className="new-todo-container">
        <form className="new-todo-container" onSubmit={handleSubmit(onSubmit)}>
          <div className="enterToDo">
            <TextField
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
            <p className="errorMsg">{errors.ToDoField.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewToDo;
