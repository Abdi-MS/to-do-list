import React, { useEffect } from "react";
import OneToDo from "../OneToDo/OneToDo";
import NewToDo from "../NewToDo/NewToDo";
import "./ToDos.css";
import { useToDoList } from "../../store/store";

function ToDos({ ToDoList }) {
  
  // useEffect(() => {
  //   startApp();
  // }, []);

  const localToDoList = useToDoList().toDoList;

  return (
    <>
      <div className="app-bg">
        <h1 className="todo-heading">My ToDo</h1>
        <NewToDo nextId={localToDoList.length + 1} />
        <hr />
        <div className="To-Dos-Wrapper">
          {localToDoList.length === 0 ? (
            <div className="No-Todos-Alert">
              <span>Enter Some To-Dos to begin!</span>
            </div>
          ) : (
            localToDoList.map((listitem, index) => {
              return <OneToDo key={index} index={index} id={listitem.id} />;
            })
          )}
        </div>
      </div>
    </>
  );
}

export default ToDos;
