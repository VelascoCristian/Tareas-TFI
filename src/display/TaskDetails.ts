import readlineSync from "readline-sync";
import { Task } from "../models/Task";
import { formatTask } from "../display/TaskFormatter";
import { EditTaskMenu } from "../menus/EditTaskMenu";

export function showTaskDetails(task: Task): void {
  console.log("\nDetalles de la tarea:");
  console.log(formatTask(task, 0));
  console.log("\n[0] Volver | [1] Editar tarea");

  const option = readlineSync.question("Seleccione una opción: ");
  if (option === "1") {
    console.log("Abriendo menú de edición...");
    const editMenu = new EditTaskMenu(task);
    editMenu.showEditMenu();
  } else if (option !== "0") {
    console.log("Opción inválida. Regresando al menú anterior.");
  }
}
