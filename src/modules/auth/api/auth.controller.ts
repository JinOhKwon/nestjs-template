import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { AuthRequest } from './dto/request/auth.request';
import { AuthResponse } from './dto/response/auth.response';

/**
 * 인증 컨트롤러이다.
 */
@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(public readonly authService: AuthService) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: AuthResponse })
	async login(@Body() authRequest: AuthRequest): Promise<AuthResponse> {
		return await this.authService.auth(authRequest);
	}
}
