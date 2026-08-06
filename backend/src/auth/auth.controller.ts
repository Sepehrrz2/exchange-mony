import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthUser, JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto, RefreshDto, RegisterDto } from './dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController { constructor(private readonly auth: AuthService) {} @Post('register') register(@Body() dto: RegisterDto) { return this.auth.register(dto); } @Post('login') login(@Body() dto: LoginDto) { return this.auth.login(dto); } @Post('refresh') refresh(@Body() dto: RefreshDto) { return this.auth.refresh(dto.refreshToken); } @ApiBearerAuth() @UseGuards(JwtAuthGuard) @Post('logout') logout(@Req() req: Request & { user: AuthUser }) { return this.auth.logout(req.user.sub); } }
