import { Admin } from './admin';

export interface AdminRepository {
  getOne(adminId: string): Promise<Admin>;
  add(admin: Admin): Promise<Admin>;
}
