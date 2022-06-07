import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { HttpUtils } from '../../../shared/http/http.utils';
import { RecipientExceptionFilter } from '../filters/recipient.filter';
import { AddRecipientDto } from '../../dto/add-recipient';
import { RecipientsService } from '../../application/recipient.service';
import { RecipientResponse } from '../../domain/recipient.response';
import { RecipientAdapter } from '../../adaptaters/recipient.adapter';

@Controller('recipient')
@UseFilters(new RecipientExceptionFilter())
export class RecipientsController {
  constructor(private readonly recipientsService: RecipientsService) {}

  @Post()
  @HttpCode(201)
  async add(
    @Body() addRecipientDto: AddRecipientDto,
    @Req() request: Request,
  ): Promise<{ url: string }> {
    const newRecipient = await this.recipientsService.add(addRecipientDto);
    return {
      url: HttpUtils.getFullUrlOf(request) + '/' + newRecipient.id,
    };
  }

  @Get()
  async getAll(@Req() request: Request): Promise<RecipientResponse[]> {
    const recipients = await this.recipientsService.getAll();
    return recipients.map((recipient) =>
      RecipientAdapter.fromAnimalToAnimalResponse(recipient),
    );
  }
}