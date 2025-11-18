interface IUser {
  email: string;
  password: string;
}

interface IUserSignUp {
  email: string;
  name: string;
  password: string;
}

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
}

interface IUpdateUserByAdmin {
  role: string;
  isActive: boolean;
  isVerified: boolean;
}

interface IUserResponse {
  id: number;
  name: string | null;
  email: string;
  role: string;
  avatarUrl: string | null;
  avatarKey: string | null;
  isActive: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

interface IUserResponseByAdmin extends IUserResponse {}

export { IUser, IUserSignUp, ICreateUser, IUserResponse, IUpdateUserByAdmin, IUserResponseByAdmin };
