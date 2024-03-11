export interface IUserResponseModel {
  userName: string;
  token: string;
  email: string;
  fullName: string;
  role: string;
}


export interface IRegisterModel {
  userName: string;
  Password: string;
  CreateDate?: string;
  firstName: string;
  lastName: string;
  email: string;
}
