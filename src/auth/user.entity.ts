import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:string;
    
    @Column()
    username:string;
    
    @Column()
    password:string;

    @Column()
    salt: string;

    async validateUserPassword(password: string): Promise<boolean> {
        let hash = await bcrypt.hash(password, this.salt)
        return this.password === hash
    }
}