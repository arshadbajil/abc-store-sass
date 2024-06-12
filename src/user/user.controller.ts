// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: { name: string, email: string, password: string, designation: string }) {
    return this.userService.createUser(createUserDto.name, createUserDto.email, createUserDto.password, 'admin', createUserDto.designation, null);
  } 

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: { name: string, email: string, role: string, designation: string }) {
    return this.userService.updateUser(+id, updateUserDto.name, updateUserDto.email, updateUserDto.role, updateUserDto.designation);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
