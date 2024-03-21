import { connect } from "react-redux";
import { addToDo } from "../../redux/toDoSlice/toDoSlice";
import NewToDo from "../NewToDo/NewToDo";
import { ToDo } from "../../types/types";
import { Dispatch } from "redux";

export type NewToDoContainerProps = {
  reduxAddToDo: (obj: ToDo) => void;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    reduxAddToDo: (obj: ToDo) => dispatch(addToDo(obj)),
  };
};

export default connect(null, mapDispatchToProps)(NewToDo);
