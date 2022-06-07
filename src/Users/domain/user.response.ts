export class UserResponse {
  id: string;
  email: string;
  userReference: string;
  userType: string;

  constructor(
    id: string,
    email: string,
    userReference: string,
    userType: string,
  ) {
    this.id = id;
    this.email = email;
    this.userType = userType;
    this.userReference = userReference;
  }
}
