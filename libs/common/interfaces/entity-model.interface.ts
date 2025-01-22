import { AggregateRoot } from '@nestjs/cqrs';
import { IdentityAbstract } from '../abstract/identity-entity.abstract';

export interface IEntityModelFactory<
  TModel extends AggregateRoot,
  TEntity extends IdentityAbstract,
> {
  createFromEntity(entity: TEntity): TModel;
  createFromModel(model: TModel): TEntity;
}
