import { useMemo, useState } from "react";
import type { TaskList } from "./types/Task";

function App() {
  const [tasks, setTasks] = useState<TaskList>([
    { id: 1, completed: true, text: "Learn React" },
    { id: 2, completed: false, text: "Build a Todo List" },
    { id: 3, completed: false, text: "Have fun!" },
  ]);

  const remainingTasks = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" placeholder="Add a new task..." />
      <button>+</button>
      <div>
        {tasks.map((task) => <div key={task.id}>
          <input type="checkbox" checked={task.completed} />
          <span>{task.text}</span>
          <button>x</button>
        </div>)}
      </div>
      <div>Remaining tasks: {remainingTasks}</div>
    </div>
  );
}

export default App;
