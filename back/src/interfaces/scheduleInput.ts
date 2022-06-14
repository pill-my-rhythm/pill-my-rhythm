export interface IGetScheduleInput {
  start: Date;
  finish: Date;
}

export interface IDailySupplementCreateInput {
  fk_user_id: string;
  fk_supplement_id: number;
  type: string;
}

export interface IScheduleCreateInput {
  type: string;
  start: Date;
  finish: Date;
  to_do: string;
  fk_user_id?: string;
}
