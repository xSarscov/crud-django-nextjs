import { TaskList } from "./components/TaskList";
import { FormTask } from "./components/FormTask";

export const revalidate = 0
export default function Home() {
  

  return (
    <main className="container mx-auto">
      <h1>Task App</h1>
      
      <div className="flex gap-x-10">
        <FormTask />
        <TaskList />
      </div>

    </main>
  );
}
