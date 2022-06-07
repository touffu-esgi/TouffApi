import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { MessageService } from '../../application/message.service';
import { MessageResponse } from '../../domain/message.response';
import { MessageAdapter } from '../../adapters/message.adapter';
import { HttpUtils } from '../../../shared/http/http.utils';
import { Message } from '../../domain/message';
import { AddMessageDto } from '../../dto/add-message.dto';
import { MessageExceptionFilter } from '../filter/message.exception.filter';

@Controller('message')
@UseFilters(new MessageExceptionFilter())
export class MessageController {
  constructor(private readonly msgService: MessageService) {}

  @Get(':userOneId/:userTwoId')
  async getConversation(
    @Req() req: Request,
    @Param('userOneId') userOneId: string,
    @Param('userTwoId') userTwoId: string,
  ): Promise<MessageResponse[]> {
    const messages: Message[] = await this.msgService.getConversation(
      userOneId,
      userTwoId,
    );
    return messages.map((msg) =>
      MessageAdapter.toMessageResponse(msg, HttpUtils.getBaseUrlOf(req)),
    );
  }

  @Post()
  @HttpCode(201)
  async sendMessage(
    @Req() req: Request,
    @Body() addMessageDto: AddMessageDto,
  ): Promise<{ url: string }> {
    const msg: Message = await this.msgService.sendMessage(addMessageDto);
    return {
      url: `${HttpUtils.getFullUrlOf(req)}/${msg.senderId}/${msg.recipientId}`,
    };
  }
}
