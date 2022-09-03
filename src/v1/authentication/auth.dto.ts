import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  public readonly email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  public readonly password: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  public readonly username: string;

  @ApiPropertyOptional()
  @IsString()
  public readonly firstName: string;

  @ApiPropertyOptional()
  @IsString()
  public readonly lastName: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  public readonly birthDate: Date;
}

export class LoginDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  public readonly email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public readonly username?: string;

  @ApiProperty()
  @IsString()
  public readonly password: string;
}
