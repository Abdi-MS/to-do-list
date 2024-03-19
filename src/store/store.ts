import { hookstate, useHookstate } from "@hookstate/core";

export interface ToDo {
  id: string;
  text: string;
  checked: boolean;
}

interface InitialState {
  toDoList: ToDo[];
}

const initialState: InitialState = {
  toDoList: [],
};

const store = hookstate(initialState);

export const toDoStoreController = {
  loadToDos: (todoArray: ToDo[]) => {
    store.toDoList.set(todoArray);
  },
  addToDo: ({ id, text, checked }: ToDo) => {
    const newToDo = {
      id,
      text,
      checked,
    };
    store.toDoList.set((list) => {
      const newList = [...list, newToDo];
      return newList;
    });
  },
  editToDo: ({ id, text, checked }: ToDo) => {
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
  deleteToDo: ({ id }: { id: string }) => {
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

export const { addToDo, editToDo, deleteToDo, useToDoList, loadToDos } =
  toDoStoreController;
