import { Injectable } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInResponse } from 'src/interfaces/auth.interfaces';

@Injectable()
export class AuthService {
  jwtSecret: string;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.jwtSecret = process.env.JWT_SECRET;
  }

  async signIn(username: string, pass: string): Promise<SignInResponse> {
    const user = await this.usersService.findOne(username);
    let access_token = null;
    if (!user) {
      return {
        access_token,
        message: 'User not found',
      };
    }

    if (user?.password !== pass) {
      return {
        access_token,
        message: 'Wrong password',
      };
    }
    const payload = { sub: user.id, username: user.username, role: user.role };
    access_token = await this.jwtService.signAsync(payload, {
      secret: this.jwtSecret,
    });
    return {
      access_token,
      message: 'success',
    };
  }

  async signOut(): Promise<null> {
    return null;
  }
}
