import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
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

  @IsString()
  public readonly firstName: string;

  @IsString()
  public readonly lastName: string;

  @IsDate()
  @Type(() => Date)
  public readonly birthDate: Date;
}

export class LoginDto {
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
