import {
  IsNotEmpty,
  IsString,
  IsAlphanumeric,
  MinLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckUsernameBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @IsAlphanumeric()
  @IsString()
  username: string;
}

export class RegisterBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @IsAlphanumeric()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profileImage: string;
}
