import { UserResponse } from '../domain/user.response';
import { User } from '../domain/user';

export class UserAdapter {
  public static fromUserToUserResponse(dto: User) {
    return new UserResponse(
      dto.id,
      dto.email,
      dto.userReference,
      dto.userTypes,
    );
  }
}
