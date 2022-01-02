import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpRequest {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsString()
  @MaxLength(20)
  @Matches(
    /^^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
    {
      message:
        '패스워드는 문자, 숫자, 특수문자를 포함한 최소 8자리여야 합니다.',
    },
  )
  password: string;
}
