import { connect } from "react-redux";
import { addToDo } from "../../redux/toDoSlice/toDoSlice";
import NewToDo from "../NewToDo/NewToDo";
import { ToDo } from "../../types/types";

const mapDispatchToProps = (dispatch: any) => {
  return {
    reduxAddToDo: (obj: ToDo) => dispatch(addToDo(obj)),
  };
};

export default connect(null, mapDispatchToProps)(NewToDo);
