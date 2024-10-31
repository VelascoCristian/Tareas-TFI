import { Task } from "../models/Task";
import { TaskStateEnum } from "../enums/TaskStateEnum";
import { DifficultyEnum } from "../enums/DifficultyEnum";

export class TaskManager {
  private readonly tasks: Task[] = [];

  /**
   * Función para agregar una nueva tarea
   */
  addTask(
    title: string,
    description: string,
    difficulty: DifficultyEnum,
    dueDate?: Date,
  ): void {
    const newTask = new Task(
      title,
      description,
      TaskStateEnum.PENDING,
      new Date(),
      dueDate || null,
      difficulty,
      null, // Atributo de modificado
    );
    this.tasks.push(newTask);
    console.log("Tarea agregada exitosamente.");
  }

  getTasks(): Task[] {
    return this.tasks;
  }
}
