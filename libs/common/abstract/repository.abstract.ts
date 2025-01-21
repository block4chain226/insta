import { DeepPartial, Repository } from 'typeorm';
import { IRepositoryAbstract } from '../ports/out/repository-abstract.interface';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export abstract class BaseRepository<TModel, R>
  implements IRepositoryAbstract<TModel, R>
{
  constructor(private readonly repository: Repository<TModel>) {}

  async create(data: DeepPartial<TModel>): Promise<TModel> {
    const entity = this.repository.create(data);
    const saved = await this.repository.save(entity);
    if (!saved)
      throw new InternalServerErrorException(
        'data was not be saved to database',
      );
    return saved;
  }
}
