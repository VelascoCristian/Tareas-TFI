import { DifficultyEnum } from "../enums/DifficultyEnum";

const difficultyMap = new Map<string, DifficultyEnum>([
  ["1", DifficultyEnum.EASY],
  ["2", DifficultyEnum.MEDIUM],
  ["3", DifficultyEnum.HARD],
]);

export function getDifficultyEnum(input: string): DifficultyEnum | undefined {
  return difficultyMap.get(input);
}
