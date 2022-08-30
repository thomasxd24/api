import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiPropertyOptional()
  public readonly name: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiPropertyOptional()
  public readonly forename: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiPropertyOptional()
  public readonly nickname: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly faculty: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly department: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @ApiPropertyOptional()
  public readonly promotion: number;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly birthDate: Date;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly address: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly parentAddress: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly phone: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly emergencyPhone: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly gender: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public readonly pronouns: string;
}
