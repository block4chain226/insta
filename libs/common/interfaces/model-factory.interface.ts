import { DeepPartial } from 'typeorm';

export interface IModelFactory<TModel, R> {
  create(
    ...args: any
  ): DeepPartial<TModel> | Promise<DeepPartial<TModel>> | Promise<R>;
}
