import { TaskStateEnum } from "../enums/TaskStateEnum";
import { DifficultyEnum } from "../enums/DifficultyEnum";

export class Task {
  constructor(
    private title: string,
    private description: string = "",
    private state: TaskStateEnum,
    private readonly creationDate: Date = new Date(),
    private dueDate: Date | null = null,
    private difficulty: DifficultyEnum,
    private modified: Date | null = null,
  ) {}

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getState(): TaskStateEnum {
    return this.state;
  }

  getCreationDate(): Date {
    return this.creationDate;
  }

  getDueDate(): Date | null {
    return this.dueDate;
  }

  getDifficulty(): DifficultyEnum {
    return this.difficulty;
  }

  getModified(): Date | null {
    return this.modified;
  }

  setTitle(newTitle: string): void {
    this.title = newTitle;
  }

  setDescription(newDescription: string): void {
    this.description = newDescription;
  }

  setDifficulty(newDifficulty: DifficultyEnum): void {
    this.difficulty = newDifficulty;
  }

  setDueDate(newDueDate: Date | null): void {
    this.dueDate = newDueDate;
  }

  setModifiedDate(date: Date): void {
    this.modified = date;
  }

  setState(newState: TaskStateEnum): void {
    this.state = newState;
  }
}
