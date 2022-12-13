import { Injectable } from '@nestjs/common';
import { AdminRepositoryInMemory } from '../persistence/admin.repository.in-memory';
import { Admin } from '../domain/admin';
import { AddAdminDto } from '../dto/add-admin.dto';
import { GetAdminDto } from '../dto/get-admin.dto';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepositoryInMemory) {}

  async getOne(adminId: string): Promise<Admin> {
    return await this.adminRepository.getOne(adminId);
  }

  async add(admin: AddAdminDto): Promise<Admin> {
    const nextId = this.adminRepository.getNextId();
    const newAdmin = new Admin(admin.email, nextId.toString(), admin.password);
    return await this.adminRepository.add(newAdmin);
  }

  async getByEmailAndPassword(getAdminDto: GetAdminDto) {
    return await this.adminRepository.getByEmailAndPassword(getAdminDto);
  }
}
