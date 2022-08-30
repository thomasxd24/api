import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Trim()
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  public readonly password: string;

  @IsString()
  @MinLength(3)
  @ApiPropertyOptional()
  public readonly username: string;
}

export class LoginDto {
  @Trim()
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly username?: string;

  @IsString()
  @ApiProperty()
  public readonly password: string;
}
