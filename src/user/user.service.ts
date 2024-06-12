// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async createUser(name: string, email: string, password: string, role: string, designation: string, companyId: number): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({ name, email, password: hashedPassword });
  }

  async updateUser(id: number, name: string, email: string, role: string, designation: string): Promise<[number]> {
    return this.userModel.update({ name, email }, { where: { id } });
  }

  async deleteUser(id: number): Promise<number> {
    return this.userModel.destroy({ where: { id } });
  }

  ß

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
