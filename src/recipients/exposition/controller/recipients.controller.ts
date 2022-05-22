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

@Controller('recipient')
export class RecipientsController {
  constructor(private readonly recipientsService: RecipientsService) {}

  @Post()
  @HttpCode(201)
  @UseFilters(new RecipientExceptionFilter())
  async add(
    @Body() addRecipientDto: AddRecipientDto,
    @Req() request: Request,
  ): Promise<{ url: string }> {
    console.log(addRecipientDto);
    await this.recipientsService.add(addRecipientDto);
    return {
      url: HttpUtils.getFullUrlOf(request) + '/' + addRecipientDto.name,
    };
  }
}
