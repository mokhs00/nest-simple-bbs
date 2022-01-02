import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './entity/user.entity';
import { SignUpRequest } from './model/create-user.request';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body(ValidationPipe) signUpRequest: SignUpRequest): Promise<User> {
    return this.authService.signUp(signUpRequest);
  }
}
