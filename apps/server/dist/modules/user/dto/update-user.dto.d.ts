import { CreateUserDto } from './create-user.dto';
import { Role } from '../user-role.type';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    name: string;
    description: string;
    role: Role;
}
export {};
