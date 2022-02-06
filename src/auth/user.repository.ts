import { AuthCredentialDto } from './dtos/auth-credentials.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from "typeorm";
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createUserDto:AuthCredentialDto){
        const { username, password } = createUserDto

        let user = new User()
        user.username = username
        user.password = password

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
}