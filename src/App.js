import ToDos from "./components/ToDos/ToDos";
import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { todoQueryClient } from "./todoQuery";

function App() {
  return (
    <QueryClientProvider client={todoQueryClient}>
      <div className="App">
        <ToDos />
      </div>
    </QueryClientProvider>
  );
}

export default App;
