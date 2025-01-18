export interface IRepositoryAbstract<C> {
  create(createDto: C): Promise<void>;
}
