import { Injectable } from '@nestjs/common';
import { AddRecipientDto } from '../dto/add-recipient';
import { Recipient } from '../domain/recipient';
import { RecipientRepositoryInMemory } from '../persistence/recipient.repository.in-memory';
import { SecurityUtils } from '../../shared/utils/security.utils';
import { RecipientRepositoryMongoose } from '../persistence/mongoose-recipient-repository/recipient.repository.mongoose';
import {
  RecipientProps,
  RecipientSchemaProps,
} from '../persistence/mongoose-recipient-repository/recipient.schema';

@Injectable()
export class RecipientsService {
  constructor(private recipientRepository: RecipientRepositoryMongoose) {}

  async add(dto: AddRecipientDto): Promise<Recipient> {
    const recipient: RecipientProps = {
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      password: SecurityUtils.sha512(dto.password),
      address: dto.address,
    };
    return await this.recipientRepository.save(recipient);
  }

  getAll(): Promise<Recipient[]> {
    return this.recipientRepository.getAll();
  }

  async getOne(recipientId: string): Promise<Recipient> {
    return await this.recipientRepository.getOne(recipientId);
  }
}
