import { TaskStateEnum } from "../enums/TaskStateEnum";

const stateMap = new Map<string, TaskStateEnum>([
  ["1", TaskStateEnum.PENDING],
  ["2", TaskStateEnum.INPROGRESS],
  ["3", TaskStateEnum.COMPLETED],
]);

export function getStateEnum(input: string): TaskStateEnum | undefined {
  return stateMap.get(input);
}
