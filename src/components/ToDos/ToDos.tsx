import React, { useEffect } from "react";
import OneToDo from "../OneToDo/OneToDo";
import NewToDo from "../NewToDo/NewToDo";
import "./ToDos.css";
import { useSelector, useDispatch } from "react-redux";
import { startedApp } from "../../redux/toDoSlice/toDoSlice";
import { RootState } from "../../redux/store";

function ToDos() {
  const ToDoList = useSelector((state: RootState) => {
    return state.toDo.toDoList;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startedApp());
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
            ToDoList.map((listitem, index) => {
              console.log("list here >>> ");
              console.log(listitem);
              return <OneToDo key={index} index={index} />;
            })
          )}
        </div>
      </div>
    </>
  );
}

export default ToDos;
