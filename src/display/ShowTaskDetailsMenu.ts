import readlineSync from "readline-sync";
import { Task } from "../models/Task";
import { showTaskDetails } from "./TaskDetails";

export function showTaskDetailsMenu(tasks: Task[]): void {
  console.log(
    "\nSeleccione una tarea por número para editarla, o 0 para regresar al menú principal.",
  );

  const taskIndex = readlineSync.questionInt("Número de tarea: ") - 1;
  if (taskIndex >= 0 && taskIndex < tasks.length) {
    showTaskDetails(tasks[taskIndex]);
  } else if (taskIndex !== -1) {
    console.log("Número de tarea inválido.");
  }
}
