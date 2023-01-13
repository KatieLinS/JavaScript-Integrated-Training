import { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DataContext } from "./MyContext";

export default function ToDoList() {
  const [data, setData] = useContext(DataContext);

  const deleteItem = (id) => {
    setData(data.filter((x) => x.id !== id));
  };

  return (
    <div className="App">
      <DragDropContext>
        <Droppable droppableId="to-dos">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {data.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <li
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      key={item.id}
                      className={
                        snapshot.isDragging ? "selected" : "not-selected"
                      }
                    >
                      {index + 1}.{item.name}
                      <button onClick={() => deleteItem(item.id)}>
                        Delete
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
