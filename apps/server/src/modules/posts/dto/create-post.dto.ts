import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'Enter a name for post' })
  name: string;

  @ApiProperty({ example: 'Enter description for post' })
  description: string;

  @ApiProperty({ example: '64a157cee4c70a935728db7c' })
  author: string;
  
}
