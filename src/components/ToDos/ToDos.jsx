import React from "react";
import { useState } from "react";
import NewToDo from "../NewToDo/NewToDo";
import OneToDo from "../OneToDo/OneToDo";
import "./ToDos.css";

function ToDos() {
  const [ToDoList, setToDoList] = useState([]);

  const createToDo = (newToDo) => {
    let tempToDoList = [...ToDoList];
    tempToDoList.push(newToDo);
    console.log("new list>>> ", tempToDoList);
    setToDoList(tempToDoList);
  };

  const editToDo = (index, updatedToDo) => {
    let tempToDoList = [...ToDoList];
    tempToDoList[index] = updatedToDo;
    setToDoList(tempToDoList);
  };

  const deleteToDo = (index) => {
    let tempToDoList = [...ToDoList];
    tempToDoList.splice(index, 1);
    setToDoList(tempToDoList);
  };

  return (
    <>
      <NewToDo addToDo={createToDo} />
      <div className="To-Dos-Wrapper">
        {ToDoList.length === 0 ? (
          <div className="No-Todos-Alert">
            <span>Enter Some To-Dos to begin!</span>
          </div>
        ) : (
          ToDoList.map((listitem, index) => {
            return (
              <OneToDo
                toDo={listitem}
                editToDo={editToDo}
                deleteToDo={deleteToDo}
                key={index}
                index={index}
              />
            );
          })
        )}
      </div>
    </>
  );
}

export default ToDos;
