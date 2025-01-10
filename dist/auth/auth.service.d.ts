import { OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService implements OnModuleInit {
    private readonly jwtService;
    private users;
    constructor(jwtService: JwtService);
    onModuleInit(): Promise<void>;
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
