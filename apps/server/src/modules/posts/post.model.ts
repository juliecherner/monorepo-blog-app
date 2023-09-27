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

  @Prop({ type: Types.ObjectId, ref: 'UserModel' })
  authorId: { type: Types.ObjectId; ref: 'UserModel' };

  _id: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);
