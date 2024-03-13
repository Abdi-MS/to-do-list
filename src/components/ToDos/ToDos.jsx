import React, { useEffect } from "react";
import OneToDo from "../OneToDo/OneToDo";
import NewToDo from "../NewToDo/NewToDo";
import "./ToDos.css";
import { loadToDos, useToDoList } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { getToDosFromJSON } from "../../api/todoAPIs";

function ToDos() {
  const toDosQuery = useQuery({
    queryKey: ["toDos"],
    queryFn: getToDosFromJSON,
  });

  useEffect(() => {
    if (toDosQuery.status === "success") {
      loadToDos(toDosQuery.data);
    }
  }, [toDosQuery.status]);

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
