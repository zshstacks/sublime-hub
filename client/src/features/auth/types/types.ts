export interface ValidateRegisterErrors {
  password?: string;
  "confirm-password"?: string;

  [key: string]: string | undefined;
}

export interface ValidateResetPasswordErrors {
  "new-password"?: string;
  "confirm-password"?: string;

  [key: string]: string | undefined;
}
