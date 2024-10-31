import { MenuOption } from "../types/MenuOption";
import { TaskManager } from "../managers/TaskManager";
import readlineSync from "readline-sync";
import { Task } from "../models/Task";
import { formatTask } from "../display/TaskFormatter";

export class SearchTaskMenu implements MenuOption {
  constructor(private readonly taskManager: TaskManager) {}

  execute(): void {
    console.log("Buscar tarea...");

    const searchTerm = readlineSync
      .question(
        "Ingrese palabra o frase para buscar en los títulos de tareas: ",
      )
      .trim();

    if (!searchTerm) {
      console.log(
        "No se ingresó ningún término de búsqueda. Volviendo al menú principal.",
      );
      return;
    }

    // Obtener las tareas que contienen el término de búsqueda en el título
    const matchingTasks = this.taskManager
      .getTasks()
      .filter((task: Task) =>
        task.getTitle().toLowerCase().includes(searchTerm.toLowerCase()),
      );

    if (matchingTasks.length > 0) {
      console.log(
        `Se encontraron ${matchingTasks.length} tarea(s) que coinciden con la búsqueda:\n`,
      );

      // Mostrar los títulos de las tareas con índice
      matchingTasks.forEach((task, index) => {
        console.log(`[${index + 1}] ${task.getTitle()}`);
      });

      // Preguntar al usuario si quiere ver detalles de alguna tarea específica
      const selectedIndex = readlineSync.questionInt(
        "\nIngrese el índice de la tarea para ver detalles o 0 para volver al menú principal: ",
      );

      // Si el usuario selecciona 0, vuelve al menú principal
      if (selectedIndex === 0) {
        return;
      }

      // Validar el índice ingresado y mostrar los detalles de la tarea seleccionada
      const task = matchingTasks[selectedIndex - 1];
      task
        ? console.log(
            `\nDetalles de la tarea seleccionada:\n${formatTask(task, selectedIndex - 1)}`,
          )
        : console.log("Índice no válido. Volviendo al menú principal.");
    } else {
      console.log(
        "No se encontraron tareas que coincidan con el término de búsqueda.",
      );
    }

    // Opción para regresar al menú principal
    console.log("\nPresione Enter para volver al menú principal.");
    readlineSync.question();
  }
}
