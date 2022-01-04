import * as bcrypt from 'bcrypt';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  async validatePassword(rawpassword: string): Promise<boolean> {
    const isValid = await bcrypt.compare(rawpassword, this.password);
    return isValid;
  }
}
