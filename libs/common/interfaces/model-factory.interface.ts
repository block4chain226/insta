import { DeepPartial } from 'typeorm';

export interface IModelFactory<TModel> {
  create(...args: any): DeepPartial<TModel> | Promise<DeepPartial<TModel>>;
}
