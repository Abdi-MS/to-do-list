import { hookstate, useHookstate } from "@hookstate/core";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  toDoList: [],
};

const store = hookstate(initialState);

export const toDoStoreController = {
  addToDo: ({ text, checked }) => {
    const newToDo = {
      id: uuidv4(),
      text,
      checked,
    };
    store.toDoList.set((list) => {
      const newList = [...list, newToDo];
      return newList;
    });
  },
  editToDo: ({ id, text, checked }) => {
    store.toDoList.set((list) => {
      const newList = list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            text: text ?? item.text,
            checked: checked ?? item.checked,
          };
        }
        return item;
      });
      return newList;
    });
  },
  deleteToDo: ({ id }) => {
    store.toDoList.set((list) => {
      const newList = list.filter((item) => item.id !== id);
      return newList;
    });
  },
  useToDoList: () => {
    const toDoListState = useHookstate(store);
    return toDoListState.get();
  },
};

export const { addToDo, editToDo, deleteToDo, useToDoList } =
  toDoStoreController;
