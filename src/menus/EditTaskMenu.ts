import readlineSync from "readline-sync";
import { Task } from "../models/Task";
import { getDifficultyEnum } from "../utils/getDifficultyEnum";
import { TaskStateEnum } from "../enums/TaskStateEnum";
import { getStateEnum } from "../utils/getStateEnum";
import { UserPrompt } from "../types/UserPrompt";

export class EditTaskMenu {
  private readonly editOperations: UserPrompt[] = [
    {
      fieldName: "título",
      prompt: (task: Task) =>
        `Título actual: ${task.getTitle()}\nIngrese el nuevo título: `,
      getValue: (input: string) => input.trim(),
      setValue: (task: Task, value: string) =>
        value
          ? task.setTitle(value)
          : console.log("Título inválido. Se mantiene el título actual."),
      required: true,
    },
    {
      fieldName: "descripción",
      prompt: (task: Task) =>
        `Descripción actual: ${
          task.getDescription() ? task.getDescription() : "No hay descripción"
        }\nIngrese la nueva descripción (opcional): `,
      getValue: (input: string) => input.trim() || null,
      setValue: (task: Task, value: string) =>
        value && task.setDescription(value),
      required: false,
    },
    {
      fieldName: "estado",
      prompt: (task: Task) =>
        `Estado actual: ${task.getState()}.\n` +
        `Seleccione el nuevo estado:\n` +
        `1: ${TaskStateEnum.PENDING}\n` +
        `2: ${TaskStateEnum.INPROGRESS}\n` +
        `3: ${TaskStateEnum.COMPLETED}\n` +
        `Opción: `,
      getValue: (input: string) => getStateEnum(input),
      setValue: (task: Task, value: TaskStateEnum) =>
        value
          ? task.setState(value)
          : console.log("Estado inválido. Se mantiene el estado actual."),
      required: true,
    },
    {
      fieldName: "dificultad",
      prompt: () =>
        "Seleccione la nueva dificultad (1: Fácil, 2: Medio, 3: Difícil): ",
      getValue: (input: string) => getDifficultyEnum(input),
      setValue: (task: Task, value: any) =>
        value
          ? task.setDifficulty(value)
          : console.log(
              "Dificultad inválida. Se mantiene la dificultad actual.",
            ),
      required: true,
    },
    {
      fieldName: "fecha de vencimiento",
      prompt: (task: Task) =>
        `Fecha de vencimiento actual: ${
          task.getDueDate()
            ? task.getDueDate()?.toLocaleDateString()
            : "No hay fecha de vencimiento"
        }. Ingrese la nueva fecha (opcional, formato AAAA-MM-DD): `,
      getValue: (input: string) => {
        if (!input.trim()) return null;
        const parsedDate = new Date(input);
        return isNaN(parsedDate.getTime()) ? null : parsedDate;
      },
      setValue: (task: Task, value: Date | null) => task.setDueDate(value),
      required: false,
    },
  ];

  constructor(private readonly task: Task) {}

  private processEditOperation(operation: UserPrompt): void {
    const input = readlineSync.question(operation.prompt(this.task));
    const value = operation.getValue(input, this.task);
    operation.setValue(this.task, value);
  }

  showEditMenu(): void {
    console.log("\n--- Editar tarea ---");
    this.editOperations.forEach((operation) => {
      this.processEditOperation(operation);
    });
    this.task.setModifiedDate(new Date());
    console.log("Tarea actualizada exitosamente.");
  }
}
