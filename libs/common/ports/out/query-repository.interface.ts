import { FindOptionsWhere } from 'typeorm';

export interface IQueryRepository<TModel, TEntity> {
  findAll(): Promise<TModel[]>;
  findOneBy(query: FindOptionsWhere<TEntity>): Promise<TModel>;
}
