import { Injectable } from '@nestjs/common';
import { AddRecipientDto } from '../dto/add-recipient';
import { Recipient } from '../domain/recipient';
import { RecipientRepositoryInMemory } from '../persistence/recipient.repository.in-memory';
import { SecurityUtils } from '../../shared/utils/security.utils';
import { UserRepositoryInMemory } from '../../Users/persistence/user.repository.in-memory';

@Injectable()
export class RecipientsService {
  constructor(
    private recipientRepository: RecipientRepositoryInMemory,
    private userRepository: UserRepositoryInMemory,
  ) {}

  async add(dto: AddRecipientDto): Promise<Recipient> {
    const nextId = this.recipientRepository.getNextId();
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

  async getOne(recipientId: string): Promise<Recipient> {
    const recipient: Recipient = await this.recipientRepository.getOne(
      recipientId,
    );
    const recipientUser =
      await this.userRepository.getOneByUserTypeAndReference(
        recipientId,
        'recipient',
      );
    recipient.userId = recipientUser.id;
    return recipient;
  }

  async getAll(): Promise<Recipient[]> {
    const recipients = await this.recipientRepository.getAll();
    for (const i of Object.keys(recipients)) {
      const recipientUser =
        await this.userRepository.getOneByUserTypeAndReference(
          recipients[i].id,
          'recipient',
        );
      recipients[i].userId = recipientUser.id;
    }
    return recipients;
  }
}
