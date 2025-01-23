export interface IQueryRepository<TModel, TEntity> {
  findAll(): Promise<TModel[]>;
}
