import { connect } from "react-redux";
import { startedApp } from "../../redux/toDoSlice/toDoSlice";
import ToDos from "../ToDos/ToDos";
import { RootState } from "../../redux/store";

const mapStateToProps = (state:RootState) => {
  return {
    ToDoList: state.toDo.toDoList,
  };
};

const mapDispatchToProps = (dispatch:any) => {
  return {
    startApp: () => dispatch(startedApp()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDos)
