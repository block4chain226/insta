export interface IQueryFactory<TModel, R> {
  findAll(): Promise<R[]>;
}
