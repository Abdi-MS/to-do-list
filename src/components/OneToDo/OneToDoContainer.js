import { connect } from "react-redux";
import {
  editToDo as reduxEditToDo,
  deleteToDo as reduxDeleteToDo,
} from "../../redux/toDoSlice/toDoSlice";

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

const connectOneToDo = connect(mapStateToProps, mapDispatchToProps);

export default connectOneToDo;
