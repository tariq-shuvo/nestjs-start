import { AuthCredentialDto } from './dtos/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){}

    async createUser(createUserDto:AuthCredentialDto):Promise<void>{
        return this.userRepository.createUser(createUserDto);
    }
}
