import { useState } from "react";
import type { TaskList } from "./types/Task";

function App() {
  const [tasks, setTasks] = useState<TaskList>([
    { id: 1, completed: true, text: "Learn React" },
    { id: 2, completed: false, text: "Build a Todo List" },
    { id: 3, completed: false, text: "Have fun!" },
  ]);

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" placeholder="Add a new task..." />
      <button>+</button>
      <div>
        {tasks.map((task) => <div key={task.id}>
          <input type="checkbox" checked={task.completed} />
          <span>{task.text}</span>
        </div>)}
      </div>
      <div>Remaining tasks: {tasks.filter((task) => !task.completed).length}</div>
    </div>
  );
}

export default App;
