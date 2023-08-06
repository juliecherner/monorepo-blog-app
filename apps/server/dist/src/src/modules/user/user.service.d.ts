import { CreateUserDto } from 'types';
import { UpdateUserDto } from 'types';
import { Model } from 'mongoose';
import { UserModel } from './user.model';
import { BaseService } from '../base/base.service';
export declare class UserService extends BaseService<UserModel, CreateUserDto, UpdateUserDto> {
    private readonly userModel;
    constructor(userModel: Model<UserModel>);
}
//# sourceMappingURL=user.service.d.ts.map