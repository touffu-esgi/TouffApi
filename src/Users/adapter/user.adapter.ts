import { UserResponse } from '../domain/user.response';
import { User } from '../domain/user';
import { UserResponseWithPassword } from '../domain/user-with-password.response';

export class UserAdapter {
  public static fromUserToUserResponse(dto: User) {
    return new UserResponse(
      dto.id,
      dto.email,
      dto.userReference,
      dto.userTypes,
    );
  }

  static fromUserToUserResponseWithPassword(
    dto: User,
  ): UserResponseWithPassword {
    return new UserResponseWithPassword(
      dto.id,
      dto.email,
      dto.password,
      dto.userReference,
      dto.userTypes,
    );
  }
}
