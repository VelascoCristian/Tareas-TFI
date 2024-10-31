import { MenuOption } from "../types/MenuOption";
import { TaskManager } from "../managers/TaskManager";
import readlineSync from "readline-sync";
import { FilterMenuDisplay } from "../display/FilterMenuDisplay";
import { getMenuOptions } from "../display/getMenuOptions";

export class ShowTaskMenu implements MenuOption {
  constructor(private readonly taskManager: TaskManager) {}

  execute(): void {
    this.processMenuOption(); // Llama a la función recursiva inicial
  }

  private processMenuOption(): void {
    FilterMenuDisplay(); // Muestra las opciones del menú
    const option = readlineSync.question("Seleccione una opción: ");
    const menuOptions = getMenuOptions(this.taskManager);

    const action = menuOptions.get(option);

    if (action) {
      action();
      if (option !== "0") {
        this.processMenuOption(); // Llama recursivamente a la función para la siguiente opción
      } else {
        console.log("Regresando al menú principal...");
      }
    } else {
      console.log("Opción inválida. Por favor, elija una opción válida.");
      this.processMenuOption(); // Llama de nuevo para intentar otra opción
    }
  }
}
