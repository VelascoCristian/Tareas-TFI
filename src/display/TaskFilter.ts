import { Task } from "../models/Task";
import { TaskStateEnum } from "../enums/TaskStateEnum";

export function taskFilter(
  tasks: Task[],
  filter: "Todas" | TaskStateEnum,
): Task[] {
  return filter === "Todas"
    ? tasks
    : tasks.filter((task) => task.getState() === filter);
}
