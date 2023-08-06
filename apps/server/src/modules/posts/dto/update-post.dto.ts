import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ example: 'Enter new name for post' })
  name: string;

  @ApiProperty({ example: 'Enter new description for post' })
  description: string;
}
