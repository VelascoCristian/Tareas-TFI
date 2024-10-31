import { Task } from "../models/Task";
import { DifficultyStars } from "../enums/DifficultyEnum";

export function formatTask(task: Task, index: number): string {
  return `
      Tarea #${index + 1}
      Título: ${task.getTitle()}
      Descripción: ${task.getDescription() || "Sin descripción"}
      Estado: ${task.getState()}
      Dificultad: ${DifficultyStars[task.getDifficulty()]}
      Fecha de creación: ${task.getCreationDate()}
      Fecha de vencimiento: ${task.getDueDate() || "Sin vencimiento"}
      Última modificación: ${task.getModified() || "Sin modificaciones"}
    `;
}
