import { Injectable } from '@nestjs/common';
import { AddRecipientDto } from '../dto/add-recipient';
import { Recipient } from '../domain/recipient';
import { RecipientRepositoryInMemory } from '../persistence/recipient.repository.in-memory';
import { SecurityUtils } from '../../shared/utils/security.utils';

@Injectable()
export class RecipientsService {
  constructor(private recipientRepository: RecipientRepositoryInMemory) {}

  async add(dto: AddRecipientDto): Promise<Recipient> {
    const nextId = await this.recipientRepository.getNextId();
    const recipient = new Recipient(
      nextId,
      dto.name,
      dto.surname,
      dto.email,
      dto.phoneNumber,
      SecurityUtils.sha512(dto.password),
      dto.address,
    );
    return await this.recipientRepository.save(recipient);
  }

  getAll(): Promise<Recipient[]> {
    return this.recipientRepository.getAll();
  }
}