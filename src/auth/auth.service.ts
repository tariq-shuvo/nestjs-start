import { AuthCredentialDto } from './dtos/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtPaylod } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService:JwtService,
    ){}

    async createUser(createUserDto:AuthCredentialDto):Promise<void>{
        return this.userRepository.createUser(createUserDto);
    }

    async loginUser(authCredentialDto:AuthCredentialDto){
        const username = await this.userRepository.validateUserCredential(authCredentialDto)
        if(!username){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload:jwtPaylod = { username };

        const accessToken = await this.jwtService.sign(payload);

        return {accessToken}
    }
}
