import React, { useEffect } from "react";
import NewToDo from "../containers/NewToDoContainer";
import OneToDo from "../containers/OneToDoContainer";
import "./ToDos.css";
import { ToDo } from "../../types/types";
import { ToDosContainerProps } from "../containers/ToDosContainer";

const ToDos: React.FC<ToDosContainerProps> = ({ ToDoList, startApp}) => {
  useEffect(() => {
    startApp();
  }, []);

  return (
    <>
      <div className="app-bg">
        <h1 className="todo-heading">My ToDo</h1>
        <NewToDo />
        <hr />
        <div className="To-Dos-Wrapper">
          {ToDoList.length === 0 ? (
            <div className="No-Todos-Alert">
              <span>Enter Some To-Dos to begin!</span>
            </div>
          ) : (
            ToDoList.map((listitem: ToDo, index: number) => {
              return <OneToDo key={index} index={index} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default ToDos;
