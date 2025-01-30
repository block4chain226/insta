import { FindOptionsWhere, Repository, WhereExpressionBuilder } from 'typeorm';
import { IEntityModelFactory } from '../interfaces/entity-model.interface';
import { AggregateRoot } from '@nestjs/cqrs';
import { IdentityAbstract } from './identity-entity.abstract';
import { IQueryRepository } from '../ports/out/query-repository.interface';
import {
  WhereClause,
  WhereClauseCondition,
} from 'typeorm/query-builder/WhereClause';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

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

  async findOneBy(query: FindOptionsWhere<TEntity>): Promise<TModel> {
    const entity = await this.repository.findOneBy(query);
    if (!entity) throw new RpcException('credentials');
    return this.entityModelFactory.createFromEntity(entity);
  }
}
