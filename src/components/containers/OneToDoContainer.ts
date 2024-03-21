import { connect } from "react-redux";
import {
  editToDo as reduxEditToDo,
  deleteToDo as reduxDeleteToDo,
} from "../../redux/toDoSlice/toDoSlice";
import OneToDo from "../OneToDo/OneToDo";
import { EditedTodoObj, ToDo } from "../../types/types";
import { RootState } from "../../redux/store";
import { Dispatch } from "redux";

type StateProps = {
  toDoList: ToDo[];
};

type DispatchProps = {
  editToDo: ({ id, text, checked }: EditedTodoObj) => void;
  deleteToDo: ({ delIndex, id }: { delIndex: number; id: string }) => void;
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    toDoList: state.toDo.toDoList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    editToDo: ({ id, text, checked }) =>
      dispatch(reduxEditToDo({ id, text, checked })),
    deleteToDo: ({ delIndex, id }) =>
      dispatch(reduxDeleteToDo({ delIndex, id })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OneToDo);
