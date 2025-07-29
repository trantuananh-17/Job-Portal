import { ITokenResponse } from '../interfaces/auth.interface';
import { IUser, IUserSignUp } from '../interfaces/user.interface';

export interface IAuthService {
  signUp(requestBody: IUserSignUp): Promise<ITokenResponse>;
  signIn(requestBody: IUser): Promise<ITokenResponse>;
}
