import React, { useEffect } from "react";
import NewToDo from "../NewToDo/NewToDo";
import OneToDo from "../OneToDo/OneToDo";
import "./ToDos.css";
import { useSelector, useDispatch } from "react-redux";
import { startedApp } from "../../redux/toDoSlice/toDoSlice";

function ToDos() {
  const ToDoList = useSelector((state) => {
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
        <NewToDo nextId={ToDoList.length + 1} />
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
              return <OneToDo key={index} index={index} id={listitem.id} />;
            })
          )}
        </div>
      </div>
    </>
  );
}

export default ToDos;
