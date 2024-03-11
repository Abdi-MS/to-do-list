import { connect } from "react-redux";
import {
  editToDo as reduxEditToDo,
  deleteToDo as reduxDeleteToDo,
} from "../../redux/toDoSlice/toDoSlice";
import OneToDo from "../OneToDo/OneToDo";

const mapStateToProps = (state) => {
  return {
    toDoList: state.toDo.toDoList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editToDo: ({ id, text, checked }) =>
      dispatch(reduxEditToDo({ id, text, checked })),
    deleteToDo: ({ delIndex, id }) =>
      dispatch(reduxDeleteToDo({ delIndex, id })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OneToDo);
