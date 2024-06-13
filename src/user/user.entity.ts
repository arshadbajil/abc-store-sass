import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Company } from '../company/company.entity';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

@Table
export class User extends Model<User> {
  @IsNotEmpty()
  @IsString()
  @Column
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Column
  email: string;

  @IsNotEmpty()
  @IsString()
  @Column
  password: string;

  @ForeignKey(() => Company)
  @Column
  companyId: number | null;

  @BelongsTo(() => Company)
  company: Company;
}
