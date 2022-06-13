export interface IChecklistCreateInput {
  date: Date;
  one: boolean;
  two: boolean;
  three: boolean;
  four: boolean;
  five: boolean;
  six: boolean;
}

export interface IChecklistCreateType {
  fk_user_id: string;
  date: Date;
  one: boolean;
  two: boolean;
  three: boolean;
  four: boolean;
  five: boolean;
  six: boolean;
  level?: number;
}

export interface IChecklistWeeklyInput {
  start: Date;
  finish: Date;
}
