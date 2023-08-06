import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model } from 'mongoose';
import { PostModel } from './post.model';
import { BaseService } from '../base/base.service';
export declare class PostsService extends BaseService<PostModel, CreatePostDto, UpdatePostDto> {
    private readonly postModel;
    constructor(postModel: Model<PostModel>);
}
