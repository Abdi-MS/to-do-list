import React from "react";
import { useState } from "react";
import NewToDo from "../NewToDo/NewToDo";
import OneToDo from "../OneToDo/OneToDo";
import "./ToDos.css";
import { useSelector } from "react-redux";

function ToDos() {
  const ToDoList = useSelector((state) => {
    return state.toDo.toDoList;
  });

  const createToDo = (newToDo) => {
    let tempToDoList = [...ToDoList];
    tempToDoList.push(newToDo);
    console.log("new list>>> ", tempToDoList);
    //setToDoList(tempToDoList);
  };

  return (
    <>
      <div className="app-bg">
        <h1 className="todo-heading">My ToDo</h1>
        <NewToDo addToDo={createToDo} />
        <hr />
        <div className="To-Dos-Wrapper">
          {ToDoList.length === 0 ? (
            <div className="No-Todos-Alert">
              <span>Enter Some To-Dos to begin!</span>
            </div>
          ) : (
            ToDoList.map((listitem, index) => {
              return <OneToDo key={index} index={index} />;
            })
          )}
        </div>
      </div>
    </>
  );
}

export default ToDos;
