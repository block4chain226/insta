export interface IRepositoryAbstract<TModel> {
  create(data: TModel): Promise<void>;
}
