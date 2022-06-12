export interface IChecklistCreateInput {
  one: boolean;
  two: boolean;
  three: boolean;
  four: boolean;
  five: boolean;
  six: boolean;
}

export interface IChecklistCreateType {
  fk_user_id: string;
  date: string;
  one: boolean;
  two: boolean;
  three: boolean;
  four: boolean;
  five: boolean;
  six: boolean;
  level?: number;
}
