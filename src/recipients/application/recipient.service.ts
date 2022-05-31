import { Injectable } from '@nestjs/common';
import { AddRecipientDto } from '../dto/add-recipient';
import { Recipient } from '../domain/recipient';
import { RecipientRepositoryInMemory } from '../persistence/recipient.repository.in-memory';
import { SecurityUtils } from '../../shared/utils/security.utils';

@Injectable()
export class RecipientsService {
  constructor(private recipientRepository: RecipientRepositoryInMemory) {}

  async add(dto: AddRecipientDto): Promise<void> {
    const recipient = new Recipient(
      dto.name,
      dto.surname,
      dto.email,
      dto.phoneNumber,
      SecurityUtils.sha512(dto.password),
      dto.address,
    );
    this.recipientRepository.save(recipient);
  }

  getAll(): Promise<Recipient[]> {
    return this.recipientRepository.getAll();
  }
}
