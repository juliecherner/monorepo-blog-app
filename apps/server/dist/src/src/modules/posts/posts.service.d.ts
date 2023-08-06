import { CreatePostDto } from 'types';
import { UpdatePostDto } from 'types';
import { Model } from 'mongoose';
import { PostModel } from './post.model';
import { BaseService } from '../base/base.service';
export declare class PostsService extends BaseService<PostModel, CreatePostDto, UpdatePostDto> {
    private readonly postModel;
    constructor(postModel: Model<PostModel>);
}
//# sourceMappingURL=posts.service.d.ts.map