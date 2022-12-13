export class UserResponse {
  id: string;
  email: string;
  userReference: string;
  userType: string;
  profilePic: string;
  status: string;

  constructor(
    id: string,
    email: string,
    userReference: string,
    userType: string,
    status: string,
    profilePic = 'default.png',
  ) {
    this.id = id;
    this.email = email;
    this.userType = userType;
    this.userReference = userReference;
    this.status = status;
    this.profilePic = profilePic;
  }
}
