import { DeepPartial, Repository } from 'typeorm';
import { IRepositoryAbstract } from '../ports/out/repository-abstract.interface';
import { User } from 'apps/users-app/src/infrastructure/entety/user.entity';
import { IEntityModelFactory } from '../interfaces/entity-model.interface';
import { AggregateRoot } from '@nestjs/cqrs';
import { IdentityAbstract } from './identity-entity.abstract';

export abstract class BaseRepository<
  TModel extends AggregateRoot,
  TEntity extends IdentityAbstract,
> implements IRepositoryAbstract<TModel, TEntity>
{
  constructor(
    private readonly repository: Repository<TEntity>,
    private readonly entityModelFactory: IEntityModelFactory<TModel, TEntity>,
  ) {}

  async create(data: TModel): Promise<TModel> {
    const entityFromModel = this.entityModelFactory.createFromModel(data);
    const entity = this.repository.create(entityFromModel);
    const saved = await this.repository.save(entity);
    return this.entityModelFactory.createFromEntity(saved);
  }
}
