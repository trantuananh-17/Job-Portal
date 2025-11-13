export interface IUser {
  id?: number;
  name: string;
  email: string;
  role: string;
  status?: boolean;
  isActive?: boolean;
  isVerified?: boolean;
  avatar?: string | null;
  createdAt?: string;
}
