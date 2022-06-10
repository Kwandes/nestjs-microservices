import { IsNotEmpty, MaxLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}

export class SignupDto {
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}
