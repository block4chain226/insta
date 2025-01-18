export interface IModelFactory<TModel> {
  create(...args: any): TModel | Promise<TModel>;
}
