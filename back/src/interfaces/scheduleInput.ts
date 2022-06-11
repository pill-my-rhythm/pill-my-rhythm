export interface IScheduleCreateInput {
  type: string;
  start: Date;
  finish: Date;
  to_do: string;
  fk_user_id?: string;
}
