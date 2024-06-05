import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IUserAuth } from 'src/interfaces/auth.interfaces';
import { IResponse } from 'src/interfaces/responses.interfaces';
import { UsersService } from 'src/services/user.service';

export class IUserProfileDto {
  @ApiProperty()
  username: string;
}

export class IUserCreateDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: String, minLength: 3, maxLength: 255 })
  username: string;

  @ApiProperty({ type: String, minLength: 8, maxLength: 255 })
  password: string;

  @ApiProperty({ enum: ['Admin', 'User'] })
  role: 'Admin' | 'User';

  @ApiProperty({ type: String, minLength: 8, maxLength: 255 })
  email: string;

  @ApiProperty()
  campus_id: string;

  @ApiProperty()
  picture: string;
}

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get('profile')
  async userProfile(
    @Query() userProfileDto: IUserProfileDto,
  ): Promise<IResponse<Omit<IUserAuth, 'password'>>> {
    const user = await this.userService.userProfile(userProfileDto.username);
    return {
      status: 200,
      message: 'success',
      data: user,
    };
  }

  @Post('create')
  async createUser(
    @Body() createUserDto: IUserCreateDto,
  ): Promise<IResponse<string>> {
    const user = createUserDto;
    const data = await this.userService.createUser(user);
    return {
      status: 200,
      message: 'success',
      data: data,
    };
  }
}
