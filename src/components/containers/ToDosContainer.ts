import { connect } from "react-redux";
import { startedApp } from "../../redux/toDoSlice/toDoSlice";
import ToDos from "../ToDos/ToDos";
import { RootState } from "../../redux/store";
import { ToDo } from "../../types/types";
import React from "react";
import { Dispatch } from "redux";

const mapStateToProps = (state: RootState) => {
  return {
    ToDoList: state.toDo.toDoList,
  };
};

export type ToDosContainerProps = {
  ToDoList: ToDo[];
  startApp: () => void;
  index: number;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    startApp: () => dispatch(startedApp()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDos) as React.ComponentType<ToDosContainerProps>;
