import { Task } from "../models/Task";
import { taskFilter } from "./TaskFilter";
import { formatTask } from "./TaskFormatter";
import { TaskStateEnum } from "../enums/TaskStateEnum";
import { showTaskDetailsMenu } from "./ShowTaskDetailsMenu";

export function displayTasks(
  tasks: Task[],
  filter: "Todas" | TaskStateEnum,
): void {
  const filteredTasks = taskFilter(tasks, filter);

  if (filteredTasks.length === 0) {
    console.log("No hay tareas para mostrar en esta categoría.");
    return;
  }

  filteredTasks.sort((a, b) => a.getTitle().localeCompare(b.getTitle()));
  filteredTasks.forEach((task, index) => {
    console.log(formatTask(task, index));
  });

  showTaskDetailsMenu(filteredTasks);
}
