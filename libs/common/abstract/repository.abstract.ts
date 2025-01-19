import { DeepPartial, Repository } from 'typeorm';
import { IRepositoryAbstract } from '../ports/out/repository-abstract.interface';

export abstract class BaseRepository<TModel, R>
  implements IRepositoryAbstract<TModel, R>
{
  constructor(private readonly repository: Repository<TModel>) {}

  async create(data: DeepPartial<TModel>): Promise<TModel> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }
}
