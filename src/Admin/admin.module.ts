import { Module } from '@nestjs/common';
import { AdminRepositoryInMemory } from './persistence/admin.repository.in-memory';
import { AdminService } from './application/admin.service';
import { AdminController } from './exposition/controller/admin.controller';
@Module({
	controllers: [AdminController],
	providers: [AdminService, AdminRepositoryInMemory]
})
export class AdminModule {}
