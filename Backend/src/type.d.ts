interface UserPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

declare namespace Express {
  export interface Request {
    user: UserPayload;
  }

  export interface Response {
    user: UserPayload;
  }
}
