import { Module } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { UserController } from 'src/controller/user.controller';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
