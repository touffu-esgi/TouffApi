import { Admin } from '../domain/admin';
import { AdminRepository } from '../domain/admin.repository';

export class AdminRepositoryInMemory implements AdminRepository {
  private admins: Admin[] = [];
}
