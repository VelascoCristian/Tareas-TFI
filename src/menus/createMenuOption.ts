import { MenuOption } from "../types/MenuOption";
import { ShowTaskMenu } from "./ShowTaskMenu";
import { SearchTaskMenu } from "./SearchTaskMenu";
import { AddTaskMenu } from "./AddTaskMenu";
import { TaskManager } from "../managers/TaskManager";

const menuOptions = new Map<string, (taskManager: TaskManager) => MenuOption>([
  ["1", (taskManager) => new ShowTaskMenu(taskManager)],
  ["2", (taskManager) => new SearchTaskMenu(taskManager)],
  ["3", (taskManager) => new AddTaskMenu(taskManager)],
]);

export function createMenuOption(
  option: string,
  taskManager: TaskManager,
): MenuOption | undefined {
  return menuOptions.get(option)?.(taskManager);
}
