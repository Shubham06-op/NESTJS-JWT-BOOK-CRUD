import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements OnModuleInit {
  private users = [
    {
      id: 1,
      username: 'testuser',
      password: '', // Placeholder for pre-hashed password
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async onModuleInit() {
    // Hash the password for the test user during module initialization
    this.users[0].password = await bcrypt.hash('password', 10);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = this.users.find((user) => user.username === username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
