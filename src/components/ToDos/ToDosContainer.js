import { connect } from "react-redux";
import { startedApp } from "../../redux/toDoSlice/toDoSlice";

const mapStateToProps = (state) => {
  return {
    ToDoList: state.toDo.toDoList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startApp: () => dispatch(startedApp()),
  };
};

const connectToDo = connect(mapStateToProps, mapDispatchToProps);

export default connectToDo;
