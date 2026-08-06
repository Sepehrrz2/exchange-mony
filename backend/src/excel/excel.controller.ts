import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { Request, Response } from 'express';
import { AuthUser, JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExcelService } from './excel.service';
@ApiTags('excel') @ApiBearerAuth() @UseGuards(JwtAuthGuard) @Controller('excel')
export class ExcelController { constructor(private readonly service: ExcelService) {} @Post('upload') @ApiConsumes('multipart/form-data') @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } }) @UseInterceptors(FileInterceptor('file', { storage: memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })) upload(@Req() req: Request & { user: AuthUser }, @UploadedFile() file: Express.Multer.File) { return this.service.process(req.user.sub, file); } @Get('download/:id') async download(@Req() req: Request & { user: AuthUser }, @Param('id') id: string, @Res() res: Response) { const file = await this.service.fileFor(req.user.sub, id); return res.download(file.path, file.name); } }
