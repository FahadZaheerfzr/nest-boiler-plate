import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from 'src/interfaces/responses.interfaces';
import { SignInResponse } from 'src/interfaces/auth.interfaces';

export class ISignInDto {
  @ApiProperty({ type: String, minLength: 3, maxLength: 255 })
  username: string;

  @ApiProperty({ type: String, minLength: 8, maxLength: 255 })
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: ISignInDto): Promise<IResponse<string>> {
    const data: SignInResponse = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );

    return {
      status: 200,
      message: data.message,
      data: data.access_token,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async signOut(): Promise<IResponse<null>> {
    const data = await this.authService.signOut();

    return {
      status: 200,
      message: 'success',
      data,
    };
  }
}
