import { Repository } from 'typeorm';
import { IEntityModelFactory } from '../interfaces/entity-model.interface';
import { AggregateRoot } from '@nestjs/cqrs';
import { IdentityAbstract } from './identity-entity.abstract';
import { IQueryRepository } from '../ports/out/query-repository.interface';

export abstract class BaseQueryAbstractRepository<
  TModel extends AggregateRoot,
  TEntity extends IdentityAbstract,
> implements IQueryRepository<TModel, TEntity>
{
  constructor(
    private readonly repository: Repository<TEntity>,
    private readonly entityModelFactory: IEntityModelFactory<TModel, TEntity>,
  ) {}
  async findAll(): Promise<TModel[]> {
    const users = await this.repository.find({});
    return users.map((user) => {
      return this.entityModelFactory.createFromEntity(user);
    });
  }
}
