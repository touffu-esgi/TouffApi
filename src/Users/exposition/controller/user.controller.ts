import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../../application/user.service';
import { AddUserDto } from '../../dto/add-user.dto';
import { HttpUtils } from '../../../shared/http/http.utils';

@Controller('user')
@UseFilters()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async save(
    @Body() addUserDto: AddUserDto,
    @Req() request: Request,
  ): Promise<{ url: string }> {
    const user = await this.userService.save(addUserDto);
    return {
      url: HttpUtils.getFullUrlOf(request) + '/' + user.id,
    };
  }
}
