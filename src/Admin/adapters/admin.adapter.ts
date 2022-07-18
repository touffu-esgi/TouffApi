import { Admin } from '../domain/admin';
import { AdminResponse } from '../domain/admin.response';

export class AdminAdapter {
  public static toAdminResponse(dto: Admin): AdminResponse {
    throw new Error('Not implemented');
  }
}
