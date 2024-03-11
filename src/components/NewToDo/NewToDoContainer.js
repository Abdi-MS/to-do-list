import { connect } from "react-redux";
import {addToDo} from "../../redux/toDoSlice/toDoSlice";

const mapDispatchToProps = (dispatch) => {
  return {
    reduxAddToDo: (obj) => dispatch(addToDo(obj)),
  };
};

const connectNewToDo = connect(null, mapDispatchToProps);

export default connectNewToDo;
