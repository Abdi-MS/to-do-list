import ToDos from "./components/containers/ToDosContainer";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ToDos />
      </div>
    </Provider>
  );
}

export default App;
