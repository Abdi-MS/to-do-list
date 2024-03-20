export type ToDo = {
  id: string;
  text: string;
  checked: boolean;
};

export type EditedTodoObj = {
  id: string;
  text?: string;
  checked?: boolean;
};
