import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; 

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ username });
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

  async register(username: string, password: string) {
    const existingUser = await this.userRepository.findOneBy({ username });
    if (existingUser) {
      throw new Error('User already exists'); 
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(newUser);

    const { password: _, ...result } = savedUser;
    return result; 
  }
}
