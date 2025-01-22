export interface IRepositoryAbstract<TModel, TEntity> {
  create(data: TModel): Promise<TModel>;
}
