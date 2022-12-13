import { Admin } from '../domain/admin';
import { AdminResponse } from '../domain/admin.response';

export class AdminAdapter {
  public static toAdminResponse(dto: Admin): AdminResponse {
    return new AdminResponse({
      email: dto.email,
      id: dto.id,
      password: dto.password,
    });
  }
}
