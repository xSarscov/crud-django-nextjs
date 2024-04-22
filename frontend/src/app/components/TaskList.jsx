import { TaskCard } from "./TaskCard";

async function loadTasks() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/tasks/`)
  const tasks = await res.json()
  return tasks
}


export const TaskList = async () => {

  const tasks = await loadTasks();
  console.log(tasks);

  return (
    <div
      className="bg-slate-700 p-4 w-full"
    >
      <h2>Task list</h2>

      {tasks.map(task => (
        <TaskCard {...task} />
      )
      )}

    </div>
  )
}
