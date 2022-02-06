import { AuthCredentialDto } from './dtos/auth-credentials.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createUserDto:AuthCredentialDto){
        const { username, password } = createUserDto

        let user = new User()
        user.username = username
        user.password = password

        await user.save()
    }
}