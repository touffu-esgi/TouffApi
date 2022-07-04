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
    profilePic = 'default.png',
    status = 'active',
  ) {
    this.id = id;
    this.email = email;
    this.userType = userType;
    this.userReference = userReference;
    this.profilePic = profilePic;
    this.status = status;
  }
}
