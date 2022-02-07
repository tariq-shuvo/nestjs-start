import { User } from 'src/auth/user.entity';
import { createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator((data, req): User => {
    console.log(req)
    return req.user;
});