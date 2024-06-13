import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  async create(
    @Body()
    createUserDto: {
      name: string;
      email: string;
      password: string;
    },
  ) {
    return this.userService.createUser(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Post('login')
  async login(@Body() loginUserDto: { email: string; password: string }) {
    const user: User = await this.userService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (user) {
      const token: string = await this.authService.generateJwtToken(user);
      return { name: user.name, email: user.email, token };
    } else {
      throw new HttpException(
        'No user found for this info',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
