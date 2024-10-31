export type UserPrompt = {
  fieldName: string;
  prompt: (data: any) => string;
  getValue: (input: string, data: any) => any;
  setValue: (data: any, value: any) => void;
  required: boolean;
};
