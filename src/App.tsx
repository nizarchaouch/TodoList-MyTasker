import { useMemo, useRef, useState } from "react";
import useTasks from "./hooks/useTasks";
import "./index.css";
import Card from "./components/Card";
import DeltTask from "./components/Alert";


function App() {
  const { tasks, setTasks } = useTasks();
  const [taskToDelete, setTaskToDelete] = useState<{
    id: number;
    text: string;
  } | null>(null);

  const newtaskRef = useRef<HTMLInputElement>(null);

  const doneTasks = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  const totalTasks = tasks.length;
  const progress = tasks.length ? Math.round((doneTasks / tasks.length) * 100) : 0;

  const today = new Date();

  const formattedDate = new Date()
    .toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    })
    .replace(" ", ", ");



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
        hour: `${today.getHours()}:${today.getMinutes()}`,
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
        <div className="animate-bounce inline-flex items-center bg-white/30  border border-gray-400  gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-orange-500 h-4 w-4 text-secondary"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
          Daily focus board
        </div>
        <h1 className="max-w-xl text-5xl font-black leading-tight tracking-normal text-foreground sm:text-6xl">
          Organize today without the noise.
        </h1>
        <p className="max-w-lg text-lg leading-8 text-gray-600">
          A clean TODO workspace for capturing tasks, tracking progress, and keeping the next action obvious.
        </p>
        <div className="flex justify-between gap-3">
          <Card color="text-green-700" number={totalTasks} name="Tasks" />
          <Card color="text-green-700" number={doneTasks} name="Done" />
          <Card color="text-orange-500" number={`${progress}%`} name="Focus" />
        </div>
      </div>
      {/* Tasks section */}
      <div className="w-full max-w-xl p-5 flex flex-col gap-4 rounded-md shadow-xl bg-white/20 border border-gray-300">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black mb-4">Task list</h1>
          <div className="flex items-center mr-1 border border-gray-200 rounded-full p-2 bg-white/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4 text-[#187cc3]"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16.5 12"></polyline></svg>
            <span className="text-sm text-gray-700 ml-1 font-medium">
              {formattedDate}
            </span>
          </div>
        </div>
        <div className="w-full flex gap-2">
          <input
            onKeyDown={handleKeyDown}
            ref={newtaskRef}
            className="flex-1 border-b-2 border-2 border-gray-300 bg-[#fdfaf2] rounded-lg p-3 mr-1 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-colors"
            type="text"
            placeholder="Add a new task..."
          />
          <button
            onClick={handelAddTask}
            className="bg-gradient-to-br from-[#188174] to-[#187cc3] text-white rounded-md text-white w-22 cursor-pointer transition-transform hover:scale-105"
          >
            <p className="font-black">Add</p>
          </button>
        </div>
        <div className="flex flex-col gap-3 ">
          {totalTasks === 0 ? (
            <p className="text-gray-600 py-2 text-center font-medium">
              Nothing here yet
            </p>
          ) : (
            tasks.map((task) => (
              <div key={task.id}>
                <div className="flex justify-between border-1 border-gray-300 p-6 rounded-md bg-[#fdfaf2] transition-all hover:-translate-y-0.5 hover:border-green-600 sm:gap-4 sm:p-4">
                  <div
                    className="w-full cursor-pointer"
                    onClick={() => handleTaskCompletion(task.id)}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 checked:border-[#188174] checked:bg-[#188174]"
                        checked={task.completed}
                        readOnly
                      />
                      <div className="flex flex-col ">
                        <span className={`font-bold ${task.completed ? "line-through text-gray-500" : ""}`}>
                          {task.text}
                        </span>
                        <span className="font-medium text-sm text-gray-500">
                          {task.hour}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="group cursor-pointer py-2 px-3 rounded-md transition-colors hover:bg-gray-200"
                    onClick={() => setTaskToDelete({ id: task.id, text: task.text })}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 transition-colors group-hover:text-red-500"><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {totalTasks === doneTasks && totalTasks > 0 && (
          <span className="text-gray-500 text-sm text-center mt-4 animate-pulse">
            All clear — enjoy your day.
          </span>
        )}
      </div>
      {taskToDelete && (
        <DeltTask
          nameTask={taskToDelete.text}
          onCancel={() => setTaskToDelete(null)}
          onDelete={() => {
            handleTaskDeletion(taskToDelete.id);
            setTaskToDelete(null);
          }}
        />
      )}
    </div>

  );
}

export default App;
