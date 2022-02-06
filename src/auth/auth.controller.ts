import { AuthCredentialDto } from './dtos/auth-credentials.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}

    @Post()
    async createUser(@Body(ValidationPipe) createUserDto:AuthCredentialDto){
        return this.authService.createUser(createUserDto);
    }
}
