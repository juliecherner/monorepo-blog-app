import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseModel } from './base.model';
@Injectable()
export abstract class BaseService<TModel, TCreateDto, TUpdateDto> {
  constructor(
    @InjectModel(BaseModel.name) private readonly baseModel: Model<TModel>,
  ) { }

  async create(createDto: TCreateDto) {
    const createdModel = new this.baseModel(createDto);
    return await createdModel.save();
  }

  async find(filter: any) {
    return await this.baseModel.find(filter);
  }

  async findAll() {
    return await this.baseModel.find();
  }

  async findOne(id: string) {
    return await this.baseModel.findById(id);
  }

  async findOneAndPopulate(id: string, fieldName: string, chosenFields: Record<string, number>) {
    return await this.baseModel
      .findById(id)
      .populate({ path: fieldName, select: chosenFields })
      .exec();
  }

  async update(id: string, updateDto: TUpdateDto) {
    return await this.baseModel.findByIdAndUpdate(id, updateDto as any, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.baseModel.findByIdAndRemove(id);
  }
}
