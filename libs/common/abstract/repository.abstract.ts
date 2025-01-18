import { DeepPartial, Repository } from 'typeorm';
import { IRepositoryAbstract } from '../ports/out/repository-abstract.interface';

export abstract class BaseRepository<TModel, C>
  implements IRepositoryAbstract<C>
{
  constructor(private readonly repository: Repository<TModel>) {}

  async create(data: DeepPartial<TModel>): Promise<void> {
    const entity = this.repository.create(data);
    await this.repository.save(entity);
  }
}
