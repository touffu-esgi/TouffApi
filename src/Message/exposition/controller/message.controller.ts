import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { MessageService } from '../../application/message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly msgService: MessageService) {}

  @Get(':userOneId/:userTwoId')
  async getConversation(
    @Req() req: Request,
    @Param('userOneId') userOneId: string,
    @Param('userTwoId') userTwoId: string,
  ) {
    //Promise<MessageResponse[]>
    const messages = await this.msgService.getConversation(
      userOneId,
      userTwoId,
    );
    return messages; //map le bordel
  }
}
