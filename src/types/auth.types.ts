export interface loginDto {
  username: string;
  password: string;
}

export interface signupDto {
  name: string;
  email: string;
  telephone: string;
  password: string;
}

export type tabs = "login" | "signup"
