import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'types';
import { UpdateUserDto } from 'types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './user.model';
import { BaseService } from '../base/base.service';
@Injectable()
export class UserService extends BaseService<
  UserModel,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {
    super(userModel);
    
  }
}
