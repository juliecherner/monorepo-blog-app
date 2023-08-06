/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserModel } from './user.model';
import { CreateUserDto } from 'types';
import { BaseService } from '../base/base.service';
import { UpdateUserDto } from 'types';
export declare class UserController {
    private readonly userService;
    constructor(userService: BaseService<UserModel, CreateUserDto, UpdateUserDto>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, UserModel> & UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    create(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, UserModel> & {
        _id?: unknown;
    } & Required<{
        _id: unknown;
    }>>;
    update(createUserDto: UpdateUserDto, id: string): Promise<(import("mongoose").Document<unknown, {}, UserModel> & UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
}
//# sourceMappingURL=user.controller.d.ts.map