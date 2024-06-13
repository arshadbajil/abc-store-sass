import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './company.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company)
    private companyModel: typeof Company,
  ) {}

  async createCompany(
    name: string,
    description: string,
    admin: User,
  ): Promise<Company> {
    return this.companyModel.create({
      name,
      description,
      users: [{ role: 'admin', designation: 'CEO', user: admin }],
    });
  }

  async updateCompany(
    id: number,
    name: string,
    description: string,
  ): Promise<[number]> {
    return this.companyModel.update({ name, description }, { where: { id } });
  }

  async deleteCompany(id: number): Promise<number> {
    return this.companyModel.destroy({ where: { id } });
  }

  async addAUserToCompany(
    user: User,
    role: string,
    designation: string,
    companyId: number,
  ): Promise<string> {
    const company: Company = await this.companyModel.findOne({
      where: { id: companyId },
    });
    const users: any[] = company.users;
    const isAlreadyIncluded: boolean = users.find((u) => u.user === user)
      ? true
      : false;
    if (isAlreadyIncluded) {
      throw new HttpException('User is already added', HttpStatus.BAD_REQUEST);
    }
    users.unshift({ role, designation, user });
    company.users = users;
    await company.save();
    return 'Company information got updated';
  }

  async removeAUserToCompany(user: User, companyId: number): Promise<string> {
    const company: Company = await this.companyModel.findOne({
      where: { id: companyId },
    });
    const users: any[] = company.users;
    const index: number = users.findIndex((u) => u.user === user);

    if (!index) {
      throw new HttpException(
        'User is not available in this company',
        HttpStatus.BAD_REQUEST,
      );
    }
    users.splice(index, 1);

    company.users = users;
    await company.save();
    return 'User removed successfully';
  }
}
