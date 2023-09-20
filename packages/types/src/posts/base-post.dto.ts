import { CreatePostDto } from "./create-post.dto";

export interface BasePostDto extends CreatePostDto {
  _id: string;
}
