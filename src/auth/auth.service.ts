import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwtToken(user: User): Promise<string> {
    const payload = { username: user.email, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
