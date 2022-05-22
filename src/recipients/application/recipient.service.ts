import { HttpException, Injectable } from '@nestjs/common';
import { AddRecipientDto } from '../dto/add-recipient';
import { Recipient } from '../domain/recipient';
import { RecipientRepositoryInMemory } from '../persistence/recipient.repository.in-memory';

@Injectable()
export class RecipientsService {
  constructor(private recipientRepository: RecipientRepositoryInMemory) {}

  async add(dto: AddRecipientDto): Promise<void> {
    const recipient = new Recipient(
      dto.name,
      dto.surname,
      dto.email,
      dto.phoneNumber,
      dto.password,
      dto.address,
    );
    this.recipientRepository.save(recipient);
  }
}
