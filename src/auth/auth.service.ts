import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { SignUpRequest } from './model/create-user.request';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(signUpRequest: SignUpRequest): Promise<User> {
    return this.userRepository.signUp(signUpRequest);
  }
}
