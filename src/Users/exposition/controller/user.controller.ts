import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
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
import { GetUserDto } from '../../dto/get-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';

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

  @Post('/login')
  @HttpCode(200)
  async getUserByEmailAndPassword(
    @Body() user: GetUserDto,
    @Req() request: Request,
  ): Promise<UserResponse> {
    const userFound = await this.userService.getUserByEmailAndPassword(user);
    return UserAdapter.fromUserToUserResponse(
      userFound,
      HttpUtils.getBaseUrlOf(request),
    );
  }

  @Put(':userId')
  @HttpCode(204)
  async update(
    @Body() updateUser: UpdateUserDto,
    @Param('userId') userId: string,
    @Req() req: Request,
  ) {
    await this.userService.update(userId, updateUser);
  }
}
