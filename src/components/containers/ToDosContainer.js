import { connect } from "react-redux";
import { startedApp } from "../../redux/toDoSlice/toDoSlice";
import ToDos from "../ToDos/ToDos";

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

export default connect(mapStateToProps, mapDispatchToProps)(ToDos)
