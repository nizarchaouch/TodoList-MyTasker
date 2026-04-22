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
    //<div className="min-h-screen flex items-center justify-center bg-gray-100"></div>
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white flex flex-col gap-3 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Todo List</h1>
      <div className="w-full flex gap-2" >
        <input className="flex-1 border-b-2 border-r-2 border-gray-300 rounded-md py-1 px-2 mr-2 " type="text" placeholder="Add a new task..." />
        <button className="bg-gray-700 rounded-md text-white py-1 px-2">+</button>
      </div>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => <div key={task.id}>
          <div className="border-1 border-gray-200 p-2 rounded-md flex justify-between">
            <div className=" flex items-center gap-2">
              <input type="checkbox" checked={task.completed} />
              <span>{task.text}</span>
            </div>
            <button>x</button>
          </div>
        </div>)}
      </div>
      <div>Remaining tasks: {remainingTasks}</div>
    </div>
  );
}

export default App;
