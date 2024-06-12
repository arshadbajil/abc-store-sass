
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './company.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company)
    private companyModel: typeof Company,
  ) {}

  async createCompany(name: string, description: string,admin:User): Promise<Company> {
    return this.companyModel.create({ name, description ,users:[{role:'admin',designation:'CEO',user:admin}]});
  }

  async updateCompany(id: number, name: string, description: string): Promise<[number]> {
    return this.companyModel.update({ name, description }, { where: { id } });
  }

  async deleteCompany(id: number): Promise<number> {
    return this.companyModel.destroy({ where: { id } });
  }
}
