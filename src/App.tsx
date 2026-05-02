import { useMemo, useRef } from "react";
import useTasks from "./hooks/useTasks";
import "./index.css";
import Card from "./components/Card";

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
    /* const newTaks = [...tasks];
    console.log("before newTaks", JSON.parse(JSON.stringify(newTaks)));
    const task = newTaks.find(task => task.id === id);
    if (!task) return;
    task.completed = !task.completed;
    console.log("after newTaks", JSON.parse(JSON.stringify(newTaks)));
    setTasks(newTaks); */
    setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  const handleTaskDeletion = (id: number) => {
    /*  let newTaks = [...tasks];
     newTaks = newTaks.filter(task => task.id !== id)
     setTasks(newTaks); */
    setTasks(prev => prev.filter(task => task.id !== id));
  }


  return (
    <div className="grid md:min-h-screen grid-cols-1 p-4 md:grid-cols-2 md:items-center">
      <div className="w-full  max-w-xl p-4 justify-self-end space-y-5 p-5">
        <div className="inline-flex items-center bg-white/30  border border-gray-400  gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="stroke-orange-500 h-4 w-4 text-secondary"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
          Daily focus board
        </div>
        <h1 className="max-w-xl text-5xl font-black leading-tight tracking-normal text-foreground sm:text-6xl">
          Organize today without the noise.
        </h1>
        <p className="max-w-lg text-lg leading-8 text-gray-600">
          A clean TODO workspace for capturing tasks, tracking progress, and keeping the next action obvious.
        </p>
        <div className="flex justify-between gap-3">
          <Card color="text-green-700" number="5" name="Tasks" />
          <Card color="text-green-700" number="5" name="Done" />
          <Card color="text-orange-500" number="50%" name="Focus" />
        </div>
      </div>
      <div className="w-full max-w-xl p-4 bg-white flex flex-col gap-4 rounded-md shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Todo List</h1>
        <div className="w-full flex gap-2">
          <input
            onKeyDown={handleKeyDown}
            ref={newtaskRef}
            className="flex-1 border-b-2 border-r-2 border-gray-300 rounded-md py-1 px-2 mr-2 "
            type="text"
            placeholder="Add a new task..."
          />
          <button
            onClick={handelAddTask}
            className="bg-gray-700 rounded-md text-white py-1 px-2 cursor-pointer hover:bg-gray-800"
          >
            +
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {tasks.length === 0 ? (
            <p className="text-gray-600 py-2 text-md text-center">
              No tasks yet
            </p>
          ) : (
            tasks.map((task) => (
              <div key={task.id}>
                <div className="flex justify-between border-1 border-gray-200 p-2 rounded-md">
                  <div
                    className="w-full cursor-pointer"
                    onClick={() => handleTaskCompletion(task.id)}
                  >
                    <div className=" flex  items-center gap-2">
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        checked={task.completed}
                        readOnly
                      />
                      <span className={task.completed ? "line-through" : ""}>
                        {task.text}{" "}
                      </span>
                    </div>
                  </div>
                  <button
                    className="cursor-pointer hover:bg-gray-200"
                    onClick={() => handleTaskDeletion(task.id)}
                  >
                    ✖️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div>Remaining tasks: {remainingTasks}</div>
      </div>
    </div>
  );
}

export default App;
