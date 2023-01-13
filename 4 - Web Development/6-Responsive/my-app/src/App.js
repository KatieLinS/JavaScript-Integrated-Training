import "./App.css";
import ToDoList from "./js/ToDoList";
import DataList from "./js/MyContext";
import Form from "./js/Form";

function App() {
  return (
    <div className="App">
      <DataList>
        <Form />
        <ToDoList />
      </DataList>
    </div>
  );
}

export default App;
