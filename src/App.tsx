import { useMemo, useRef } from "react";
import useTasks from "./hooks/useTasks";

function App() {
  const { tasks, setTasks } = useTasks();
  const newtaskRef = useRef<HTMLInputElement>(null);
  const remainingTasks = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

  const handelAddTask = () => {
    const current = newtaskRef.current;
    const text = current?.value;
    if (!text) return;
    setTasks(prev => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map(task => task.id)) + 1 : 1,
        completed: false,
        text,
      },
    ]);

    current!.value = "";
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handelAddTask();
    }
  };

  const handleTaskCompletion = (id: number) => {
    const newTaks = [...tasks];
    console.log("before newTaks", JSON.parse(JSON.stringify(newTaks)));
    const task = newTaks.find(task => task.id === id);
    if (!task) return;
    task.completed = !task.completed;
    console.log("after newTaks", JSON.parse(JSON.stringify(newTaks)));
    setTasks(newTaks);
  }

  const handleTaskDeletion = (id: number) => {
    let newTaks = [...tasks];
    newTaks = newTaks.filter(task => task.id !== id)
    setTasks(newTaks);
  }


  return (
    //<div className="min-h-screen flex items-center justify-center bg-gray-100"></div>
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white flex flex-col gap-3 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Todo List</h1>
      <div className="w-full flex gap-2" >
        <input onKeyDown={handleKeyDown} ref={newtaskRef} className="flex-1 border-b-2 border-r-2 border-gray-300 rounded-md py-1 px-2 mr-2 " type="text" placeholder="Add a new task..." />
        <button onClick={handelAddTask} className="bg-gray-700 rounded-md text-white py-1 px-2 cursor-pointer hover:bg-gray-800">+</button>
      </div>
      <div className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <p className="text-gray-600 py-2 text-md text-center">No tasks yet</p>
        ) : tasks.map((task) => <div key={task.id}>
          <div className="flex justify-between border-1 border-gray-200 p-2 rounded-md" >
            <div className="w-full cursor-pointer" onClick={() => handleTaskCompletion(task.id)} >
              <div className=" flex  items-center gap-2" >
                <input type="checkbox" className="cursor-pointer" checked={task.completed} readOnly />
                <span className={task.completed ? "line-through" : ""}>{task.text} </span>
              </div>
            </div>
            <button className="cursor-pointer hover:bg-gray-200" onClick={() => handleTaskDeletion(task.id)}>✖️</button>
          </div>

        </div>)}
      </div>
      <div>Remaining tasks: {remainingTasks}</div>
    </div>
  );
}

export default App;
