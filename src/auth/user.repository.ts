import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { SignUpRequest } from './model/create-user.request';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(signUpRequest: SignUpRequest): Promise<User> {
    const { username, password } = signUpRequest;

    const exists = await this.findOne({ username });

    if (exists) {
      throw new ConflictException('Existing username');
    }

    const salt = await bcrypt.genSalt();
    const encodedPassword = await bcrypt.hash(password, salt);

    const newUser = this.create({ username, password: encodedPassword });

    await this.save(newUser);

    return newUser;
  }
}
