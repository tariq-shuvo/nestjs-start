import { User } from 'src/auth/user.entity';
import { GetUser } from './get-user.decorator';
import { AuthCredentialDto } from './dtos/auth-credentials.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}

    @Post('/signup')
    async createUser(@Body(ValidationPipe) createUserDto:AuthCredentialDto){
        return this.authService.createUser(createUserDto);
    }

    @Post('/signin')
    async loginUser(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<{accessToken:string}>{
        return this.authService.loginUser(authCredentialDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req){
        console.log(req.user)
    }
}
