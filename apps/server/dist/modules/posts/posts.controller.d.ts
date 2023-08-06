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
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BaseController } from '../base/base.controller';
import { BaseService } from '../base/base.service';
import { PostModel } from './post.model';
export declare class PostsController extends BaseController<PostModel, CreatePostDto, UpdatePostDto> {
    private readonly postService;
    constructor(postService: BaseService<PostModel, CreatePostDto, UpdatePostDto>);
    findAllModifined(): Promise<{
        message: string;
        posts: (import("mongoose").Document<unknown, {}, PostModel> & PostModel & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    create(createDto: CreatePostDto): Promise<import("mongoose").Document<unknown, {}, PostModel> & Required<{
        _id: unknown;
    }>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, PostModel> & PostModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateDto: UpdatePostDto): Promise<import("mongoose").Document<unknown, {}, PostModel> & PostModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<void>;
}
