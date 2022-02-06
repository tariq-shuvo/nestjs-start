import { AuthCredentialDto } from './dtos/auth-credentials.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from "typeorm";
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createUserDto:AuthCredentialDto){
        const { username, password } = createUserDto

        const salt = await bcrypt.genSalt()

        let user = new User()
        user.username = username
        user.password = await this.hashPassword(password, salt)
        user.salt = salt

        try {
            await user.save() 
        } catch (error) {
            if(error.code=='ER_DUP_ENTRY'){
                throw new ConflictException('username already exists')
            }else{
                throw new InternalServerErrorException()
            }
        }
        
    }

    async validateUserCredential(authCredentialDto:AuthCredentialDto) {
        const {username, password} = authCredentialDto

        let user = await this.findOne({username})

        if(user && await user.validateUserPassword(password)){
            return user.username
        }else{
            return null
        }
    }

    private async hashPassword(password:string, salt:string): Promise<string>{
        return await bcrypt.hash(password, salt)
    }
}