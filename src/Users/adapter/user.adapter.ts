import { UserResponse } from '../domain/user.response';
import { User } from '../domain/user';

export class UserAdapter {
  public static fromUserToUserResponse(dto: User, baseUrl: string) {
    const userReference = `${baseUrl}/${dto.userType}/${dto.userReference}`;
    return new UserResponse(
      dto.id,
      dto.email,
      userReference,
      dto.userType,
      dto.profilePic,
    );
  }
}
