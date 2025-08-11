import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService, private readonly cfg: ConfigService) {}

  async loginWithPassword(username: string, password: string) {
    const adminUser = this.cfg.get<string>('ADMIN_USER') || 'admin';
    const adminPass = this.cfg.get<string>('ADMIN_PASS') || 'admin';
    if (username !== adminUser || password !== adminPass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwt.signAsync({ sub: 'admin', role: 'admin', username });
    return { access_token: token };
  }
}


