import { displayTasks } from "./TaskDisplay";
import { TaskManager } from "../managers/TaskManager";
import { TaskStateEnum } from "../enums/TaskStateEnum";

export function getMenuOptions(
  taskManager: TaskManager,
): Map<string, () => void> {
  return new Map([
    ["1", () => displayTasks(taskManager.getTasks(), "Todas")],
    ["2", () => displayTasks(taskManager.getTasks(), TaskStateEnum.PENDING)],
    ["3", () => displayTasks(taskManager.getTasks(), TaskStateEnum.INPROGRESS)],
    ["4", () => displayTasks(taskManager.getTasks(), TaskStateEnum.COMPLETED)],
    ["0", () => {}],
  ]);
}
