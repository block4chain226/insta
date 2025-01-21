export interface IRepositoryAbstract<TModel, R> {
  create(data: TModel): Promise<TModel>;
}
