export namespace AUTH {
  export interface SIGN_IN_CREDENTIALS {
    email: string;
    password: string;
  }

  export interface SIGN_UP_CREDENTIALS {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
  }
}
