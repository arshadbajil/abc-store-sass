import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    createCompanyDto: {
      name: string;
      description: string;
      adminId: number;
    },
  ) {
    const adminUser: User = await this.userService.findById(
      createCompanyDto.adminId,
    );
    return this.companyService.createCompany(
      createCompanyDto.name,
      createCompanyDto.description,
      adminUser,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: { name: string; description: string },
  ) {
    return this.companyService.updateCompany(
      +id,
      updateCompanyDto.name,
      updateCompanyDto.description,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.deleteCompany(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async addUserToCompany(
    @Param('id') id: string,
    @Body()
    addUserToCompanyDto: { userId: number; role: string; designation: string },
  ) {
    const user: User = await this.userService.findById(
      addUserToCompanyDto.userId,
    );
    return this.companyService.addAUserToCompany(
      user,
      addUserToCompanyDto.role,
      addUserToCompanyDto.designation,
      +id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async removeUserFromCompany(
    @Param('id') id: string,
    @Body('userId') userId: number,
  ) {
    const user: User = await this.userService.findById(userId);
    return this.companyService.removeAUserToCompany(user, +id);
  }
}
