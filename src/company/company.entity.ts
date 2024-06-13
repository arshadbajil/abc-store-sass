import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { User } from '../user/user.entity';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class UserWithInfo {
  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  designation: string;

  @ValidateNested()
  @Type(() => User)
  user: User;
}

@Table
export class Company extends Model<Company> {
  @IsNotEmpty()
  @IsString()
  @Column
  name: string;

  @IsNotEmpty()
  @IsString()
  @Column
  description: string;

  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @HasMany(() => User)
  users: UserWithInfo[];
}
