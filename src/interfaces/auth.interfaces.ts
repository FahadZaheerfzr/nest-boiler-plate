export interface IUserAuth {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'Admin' | 'User';
  campus_id: string;
  picture: string;
}

export interface SignInResponse {
  access_token: string | null;
  message: string;
}
