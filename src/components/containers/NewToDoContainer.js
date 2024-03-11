import { connect } from "react-redux";
import {addToDo} from "../../redux/toDoSlice/toDoSlice";
import NewToDo from "../NewToDo/NewToDo";

const mapDispatchToProps = (dispatch) => {
  return {
    reduxAddToDo: (obj) => dispatch(addToDo(obj)),
  };
};

export default connect(null, mapDispatchToProps)(NewToDo)
