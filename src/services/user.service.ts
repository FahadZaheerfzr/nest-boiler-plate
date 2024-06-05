import { Injectable } from '@nestjs/common';
import { IUserAuth } from 'src/interfaces/auth.interfaces';

// This should be a real class/interface representing a user entity
export type UserAuth = IUserAuth;
export type User = Omit<UserAuth, 'password'>;

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      role: 'Admin',
      campus_id: '332654',
      email: 'admin@email.com',
      picture:
        'https://yt3.googleusercontent.com/ytc/AGIKgqOT45Fy7Xw4Tdz3QzuF8uj2cT0xEjAwl5SoPMbwLw=s900-c-k-c0x00ffffff-no-rj',
    } satisfies IUserAuth,
    {
      id: 2,
      username: 'Fahad',
      password: 'test1234',
      role: 'User',
      campus_id: '332654',
      email: 'fahad@email.com',
      picture: 'https://avatars.githubusercontent.com/u/52493343?v=4',
    } satisfies IUserAuth,
    {
      id: 2,
      username: 'Thomas',
      password: 'test4321',
      role: 'User',
      campus_id: '332654',
      email: 'thomas@email.com',
      picture:
        'https://ca.slack-edge.com/T0230NJHY7P-U0436DXGDQX-3b972cbf2835-512',
    } satisfies IUserAuth,
    {
      id: 4,
      username: 'Maxime',
      password: 'test@4321',
      role: 'Admin',
      campus_id: '332654',
      email: 'maxime@email.com',
      picture:
        'https://yt3.googleusercontent.com/ytc/AGIKgqOT45Fy7Xw4Tdz3QzuF8uj2cT0xEjAwl5SoPMbwLw=s900-c-k-c0x00ffffff-no-rj',
    } satisfies IUserAuth,
  ];

  async findOne(username: string): Promise<UserAuth | null> {
    const user = this.users.find((user) => user.username === username);
    return user || null;
  }

  async userProfile(username: string): Promise<User | null> {
    try {
      const user = this.users.find((user) => user.username === username);
      delete user.password;
      return user;
    } catch (error) {
      return null;
    }
  }

  async createUser(user: IUserAuth): Promise<string> {
    try {
      // TODO: Add logic to create user
      this.users.push(user);
      return 'User created successfully';
    } catch (error) {
      return 'Error creating user';
    }
  }
}
