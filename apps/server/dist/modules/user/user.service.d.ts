import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { UserModel } from './user.model';
import { BaseService } from '../base/base.service';
export declare class UserService extends BaseService<UserModel, CreateUserDto, UpdateUserDto> {
    private readonly userModel;
    constructor(userModel: Model<UserModel>);
}
