import { Injectable } from '@nestjs/common';
import { CreatePostDto } from 'types';
import { UpdatePostDto } from 'types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostModel } from './post.model';
import { BaseService } from '../base/base.service';
@Injectable()
export class PostsService extends BaseService<
  PostModel,
  CreatePostDto,
  UpdatePostDto
> {
  constructor(
    @InjectModel(PostModel.name) private readonly postModel: Model<PostModel>,
  ) {
    super(postModel);
  }
}
