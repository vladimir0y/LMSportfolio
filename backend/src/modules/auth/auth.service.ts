import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService, private readonly cfg: ConfigService) {}

  async loginWithPassword(username: string, password: string) {
    const adminUser = this.cfg.get<string>('ADMIN_USER') || 'BitterLemon';
    const adminPass = this.cfg.get<string>('ADMIN_PASS') || '900843Lemon';
    
    // Check credentials
    if (username !== adminUser || password !== adminPass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Generate JWT token
    const token = await this.jwt.signAsync({ 
      sub: 'admin', 
      role: 'admin', 
      username,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    });
    
    return { 
      access_token: token,
      user: {
        username,
        role: 'admin'
      }
    };
  }
}


