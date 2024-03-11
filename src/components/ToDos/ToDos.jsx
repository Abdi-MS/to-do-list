import React, { useEffect } from "react";
import NewToDo from "../NewToDo/NewToDo";
import OneToDo from "../OneToDo/OneToDo";
import "./ToDos.css";
import connectToDo from "./ToDosContainer";

function ToDos({ ToDoList, startApp }) {
  useEffect(() => {
    startApp();
  }, []);

  return (
    <>
      <div className="app-bg">
        <h1 className="todo-heading">My ToDo</h1>
        <NewToDo nextId={ToDoList.length + 1} />
        <hr />
        <div className="To-Dos-Wrapper">
          {ToDoList.length === 0 ? (
            <div className="No-Todos-Alert">
              <span>Enter Some To-Dos to begin!</span>
            </div>
          ) : (
            ToDoList.map((listitem, index) => {
              return <OneToDo key={index} index={index} id={listitem.id} />;
            })
          )}
        </div>
      </div>
    </>
  );
}

export default connectToDo(ToDos);
