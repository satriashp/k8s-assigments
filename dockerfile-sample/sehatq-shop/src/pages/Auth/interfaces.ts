interface User {
  email: string;
  password: string;
}

export interface LoginData {
  user: User;
}

export interface UserAccount {
  id: number;
  name: string;
  email: string;
  phone: string;
  authentication_token: string;
}
