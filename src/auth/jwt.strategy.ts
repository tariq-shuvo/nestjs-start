import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { jwtPaylod } from './jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport'
import {Strategy, ExtractJwt} from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecrect51',
        })
    }

    async validate(payload: jwtPaylod): Promise<User>{
        const {username} = payload
        const user = await this.userRepository.findOne({ username })
        
        if(!user){
            throw new UnauthorizedException()
        }

        return user
    }
}