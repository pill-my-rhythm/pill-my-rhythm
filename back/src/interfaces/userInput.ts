export interface IUserInput {
  pk_user_id?: string;
  user_name: string;
  email: string;
  password: string;
  gender?: string;
  age_range?: string;
  job?: string;
}

export interface IUserLoginInput {
  email: string;
  password: string;
}

export interface IUserInfoUpdateInput {
  gender: string;
  age_range: string;
  job: string;
}
