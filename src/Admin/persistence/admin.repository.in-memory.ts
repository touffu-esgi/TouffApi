import { Admin } from '../domain/admin';
import { AdminRepository } from '../domain/admin.repository';
import { GetAdminDto } from '../dto/get-admin.dto';
import { AdminNotFoundException } from '../application/exceptions/admin-not-found.exception';

export class AdminRepositoryInMemory implements AdminRepository {
  private admins: Admin[] = [
    new Admin('nathan@admin.admin', '1', 'password'),
    new Admin('théo@admin.admin', '2', 'password'),
    new Admin('sarah@admin.admin', '3', 'password'),
  ];

  async add(admin: Admin): Promise<Admin> {
    this.admins.push(admin);
    return admin;
  }

  async getOne(adminId: string): Promise<Admin> {
    return this.admins.find((admin) => admin.id === adminId);
  }

  getNextId(): string {
    return (+this.admins.at(-1).id + 1).toString();
  }

  async getByEmailAndPassword(getAdminDto: GetAdminDto): Promise<Admin> {
    const admin = this.admins.find(
      (admin) =>
        admin.email == getAdminDto.email &&
        admin.password == getAdminDto.password,
    );
    if (!admin) {
      throw new AdminNotFoundException(
        `admin with email ${getAdminDto.email} not found`,
      );
    }
    return admin;
  }
}
