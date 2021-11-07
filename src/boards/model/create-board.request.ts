import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardRequest {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
