import ToDos from "./components/ToDos/ToDos";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
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
