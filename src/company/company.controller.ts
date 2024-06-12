// src/company/company.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService,private readonly userService:UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCompanyDto: { name: string, description: string, adminId:number }) {
    const adminUser:User = await this.userService.findById(createCompanyDto.adminId);
    return this.companyService.createCompany(createCompanyDto.name, createCompanyDto.description,adminUser);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: { name: string, description: string }) {
    return this.companyService.updateCompany(+id, updateCompanyDto.name, updateCompanyDto.description);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.deleteCompany(+id);
  }
}
