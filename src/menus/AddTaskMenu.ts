import { MenuOption } from "../types/MenuOption";
import { TaskManager } from "../managers/TaskManager";
import readlineSync from "readline-sync";
import { getDifficultyEnum } from "../utils/getDifficultyEnum";
import { UserPrompt } from "../types/UserPrompt";

export class AddTaskMenu implements MenuOption {
  private readonly taskPrompts: UserPrompt[] = [
    {
      fieldName: "título",
      prompt: () => "Ingrese el título de la tarea: ",
      getValue: (input: string) => input.trim(),
      setValue: (taskData: any, value: string) => {
        !value
          ? (console.log("El título es obligatorio. Operación cancelada."),
            (taskData.cancelled = true))
          : (taskData.title = value);
      },
      required: true,
    },
    {
      fieldName: "descripción",
      prompt: () => "Ingrese la descripción de la tarea (opcional): ",
      getValue: (input: string) => input.trim(),
      setValue: (taskData: any, value: string) => {
        taskData.description = value;
      },
      required: false,
    },
    {
      fieldName: "dificultad",
      prompt: () =>
        "Seleccione la dificultad (1: Fácil, 2: Medio, 3: Difícil): ",
      getValue: (input: string) => getDifficultyEnum(input),
      setValue: (taskData: any, value: any) => {
        !value
          ? (console.log("Dificultad inválida. Operación cancelada."),
            (taskData.cancelled = true))
          : (taskData.difficulty = value);
      },
      required: true,
    },
    {
      fieldName: "fecha de vencimiento",
      prompt: () =>
        "Ingrese la fecha de vencimiento (opcional, formato AAAA-MM-DD): ",
      getValue: (input: string) => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return null;
        const parsedDate = new Date(trimmedInput);
        return isNaN(parsedDate.getTime()) ? null : parsedDate;
      },
      setValue: (taskData: any, value: Date | null) => {
        taskData.dueDate = value;
      },
      required: false,
    },
  ];

  constructor(private readonly taskManager: TaskManager) {}

  private processUserPrompt(prompt: UserPrompt, taskData: any): void {
    const input = readlineSync.question(prompt.prompt(taskData));
    const value = prompt.getValue(input, taskData);
    prompt.setValue(taskData, value);
  }

  execute(): void {
    console.log("Agregar nueva tarea...");
    const taskData: any = { cancelled: false };

    // Verificar cada campo de entrada
    for (const prompt of this.taskPrompts) {
      this.processUserPrompt(prompt, taskData);
      if (taskData.cancelled) {
        console.log("Operación cancelada.");
        return;
      }
    }

    // Agregar la tarea si todos los campos están completos
    this.taskManager.addTask(
      taskData.title,
      taskData.description || "",
      taskData.difficulty,
      taskData.dueDate || undefined,
    );
    console.log("Tarea agregada exitosamente.");
  }
}
