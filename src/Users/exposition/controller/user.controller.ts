import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../../application/user.service';
import { AddUserDto } from '../../dto/add-user.dto';
import { HttpUtils } from '../../../shared/http/http.utils';
import { UserAdapter } from '../../adapter/user.adapter';
import { UserResponse } from '../../domain/user.response';
import { UserExceptionFilter } from '../filter/user.filter';
import { GetUserDto } from '../../dto/get-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
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

  @Get('/profileImage/:imagePath')
  @HttpCode(200)
  async getImage(
    @Req() request: Request,
    @Res() res,
    @Param('imagePath') imagePath: string,
  ) {
    return res.sendFile(process.cwd() + '/upload/image/' + imagePath);
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

  @Post('/image/profile')
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/image',
        filename: (req, file, cb) => {
          const fileName: string = file.originalname.split('.')[0] + uuidv4();
          const extension: string = file.originalname.split('.')[1];
          cb(null, `${fileName}.${extension}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file): Promise<{ url: string }> {
    return { url: file.path.split('/').pop()! };
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
