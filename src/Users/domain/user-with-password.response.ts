export class UserResponseWithPassword {
  id: string;
  email: string;
  userReference: string;
  userType: string;
  password: string;

  constructor(
    id: string,
    email: string,
    userReference: string,
    userType: string,
    password: string,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.userType = userType;
    this.userReference = userReference;
  }
}
