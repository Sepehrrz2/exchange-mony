import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
export class RegisterDto { @ApiProperty() @IsEmail() email!: string; @ApiProperty() @IsString() @MinLength(2) name!: string; @ApiProperty() @IsString() @MinLength(8) password!: string; }
export class LoginDto { @ApiProperty() @IsEmail() email!: string; @ApiProperty() @IsString() @MinLength(8) password!: string; }
export class RefreshDto { @ApiProperty() @IsString() refreshToken!: string; }
