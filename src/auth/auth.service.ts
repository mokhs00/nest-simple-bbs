import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { SignUpRequest } from './model/create-user.request';
import { LoginRequest } from './model/login.request';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpRequest: SignUpRequest): Promise<User> {
    return this.userRepository.signUp(signUpRequest);
  }

  async login(loginRequest: LoginRequest): Promise<{ accessToken: string }> {
    const { username, password } = loginRequest;

    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new NotFoundException(
        `Can't find User with username : ${username}`,
      );
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('login failed');
    }

    const payload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
