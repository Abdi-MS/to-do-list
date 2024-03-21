import { connect } from "react-redux";
import {
  editToDo as reduxEditToDo,
  deleteToDo as reduxDeleteToDo,
} from "../../redux/toDoSlice/toDoSlice";
import OneToDo from "../OneToDo/OneToDo";
import { EditedTodoObj, ToDo } from "../../types/types";
import { Dispatch } from "redux";
import { RootState } from "../../redux/store";

type StateProps = {
  toDoList: ToDo[];
};

type DispatchProps = {
  editToDo: (changedToDO: EditedTodoObj) => void;
  deleteToDo: (delObject: { delIndex: number; id: string }) => void;
};

export type OneToDoPropTypes = StateProps & DispatchProps & { index: number };

const mapStateToProps = (state: RootState): StateProps => {
  return {
    toDoList: state.toDo.toDoList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    editToDo: (changedToDO) => dispatch(reduxEditToDo(changedToDO)),
    deleteToDo: (delObject) => dispatch(reduxDeleteToDo(delObject)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OneToDo);
