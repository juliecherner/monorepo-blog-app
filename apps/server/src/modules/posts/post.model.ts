import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from '../base/base.model';
import { Types } from 'mongoose';


export type PostDocument = HydratedDocument<PostModel>;

@Schema()
export class PostModel extends BaseModel {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  _id: Types.ObjectId
}

export const PostSchema = SchemaFactory.createForClass(PostModel);
