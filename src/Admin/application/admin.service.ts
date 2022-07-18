import { Injectable } from '@nestjs/common';
import { AdminRepositoryInMemory } from '../persistence/admin.repository.in-memory';
import { Admin } from '../domain/admin';
@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepositoryInMemory) {}
}
