export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserResponse {
  id: number;
  email: string;
  name: string;
  role: string;
}
