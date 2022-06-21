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
import { UserService } from '../../application/user.service';
import { AddUserDto } from '../../dto/add-user.dto';
import { HttpUtils } from '../../../shared/http/http.utils';
import { UserAdapter } from '../../adapter/user.adapter';
import { UserResponse } from '../../domain/user.response';
import { UserExceptionFilter } from '../filter/user.filter';

@Controller('user')
@UseFilters(UserExceptionFilter)
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

  @Get()
  @HttpCode(200)
  async getAll(@Req() request: Request): Promise<UserResponse[]> {
    const users = await this.userService.getAll();
    return users.map((user) =>
      UserAdapter.fromUserToUserResponse(user, HttpUtils.getBaseUrlOf(request)),
    );
  }

  @Get(':userId')
  @HttpCode(200)
  async getOne(
    @Param('userId') userId: string,
    @Req() request: Request,
  ): Promise<UserResponse> {
    const user = await this.userService.getOne(userId);
    return UserAdapter.fromUserToUserResponse(
      user,
      HttpUtils.getBaseUrlOf(request),
    );
  }
}
