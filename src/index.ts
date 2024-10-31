import readlineSync from "readline-sync";
import { createMenuOption } from "./menus/createMenuOption";
import { TaskManager } from "./managers/TaskManager";
import { showMainMenuOptions } from "./display/showMainMenuOptions";

const taskManager = new TaskManager();

/**
 * La función index muestra las opciones principales del menú,
 * solicita al usuario que elija una opción y ejecuta la
 * opción seleccionada utilizando createMenuOption
 */
function index() {
  showMainMenuOptions();
  const option = readlineSync.question("Elige una opción: ");
  if (option !== "0") {
    createMenuOption(option, taskManager)?.execute();
    index();
  }
}

index();
