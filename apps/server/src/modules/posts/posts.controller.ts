import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from 'types';
import { UpdatePostDto } from 'types';
import { BaseController } from '../base/base.controller';
import { BaseService } from '../base/base.service';
import { PostModel } from './post.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostEditGuard } from './posts-edit.guard';

@ApiTags('Posts routes')
@Controller('posts')
export class PostsController extends BaseController<
  PostModel,
  CreatePostDto,
  UpdatePostDto
> {
  constructor(
    private readonly postService: BaseService<
      PostModel,
      CreatePostDto,
      UpdatePostDto
    >,
  ) {
    super(postService);
  }

  @Get()
  async findAllModifined() {
    const posts = await this.postService.findAll();
    return { message: 'hello world', posts };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createDto: CreatePostDto) {
    return this.postService.create(createDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('default')
  @UseGuards(PostEditGuard)
  update(@Param('id') id: string, @Body() updateDto: UpdatePostDto) {
    return this.postService.update(id, updateDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
