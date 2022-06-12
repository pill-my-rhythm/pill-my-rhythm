export interface IScheduleCreateInput {
  fk_user_id?: string;
  type: string;
  start: Date;
  finish: Date;
  to_do: string;
}
