import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { LoginDto, RegisterDto } from './dto';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  private async tokens(user: { id: string; email: string }) { const payload = { sub: user.id, email: user.email }; const accessToken = await this.jwt.signAsync(payload, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m' }); const refreshToken = await this.jwt.signAsync(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d' }); await this.prisma.user.update({ where: { id: user.id }, data: { refreshTokenHash: await bcrypt.hash(refreshToken, 12) } }); return { accessToken, refreshToken }; }
  async register(dto: RegisterDto) { if (await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } })) throw new ConflictException('Email is already registered'); const user = await this.prisma.user.create({ data: { email: dto.email.toLowerCase(), name: dto.name, passwordHash: await bcrypt.hash(dto.password, 12) } }); return this.tokens(user); }
  async login(dto: LoginDto) { const user = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } }); if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) throw new UnauthorizedException('Invalid credentials'); return this.tokens(user); }
  async refresh(refreshToken: string) { let payload: { sub: string; email: string }; try { payload = this.jwt.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET }); } catch { throw new UnauthorizedException('Invalid refresh token'); } const user = await this.prisma.user.findUnique({ where: { id: payload.sub } }); if (!user?.refreshTokenHash || !(await bcrypt.compare(refreshToken, user.refreshTokenHash))) throw new UnauthorizedException('Invalid refresh token'); return this.tokens(user); }
  async logout(userId: string) { await this.prisma.user.update({ where: { id: userId }, data: { refreshTokenHash: null } }); return { success: true }; }
}
