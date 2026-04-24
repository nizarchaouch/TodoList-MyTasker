import { useEffect, useState } from "react";
import type { TaskList } from "../types/Task";

export default function useTasks() {
  const [tasks, setTasks] = useState<TaskList>(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
    return [];
  });

  //fetch tasks from local storage on component mount
  /*  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []); */

  //save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return { tasks, setTasks };
}
