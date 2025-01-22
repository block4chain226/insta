import { User } from 'apps/users-app/src/infrastructure/entety/user.entity';
import { HashService } from 'libs/common/hash/hash.service';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hashServise: HashService,
  ) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async BeforeInsert(event: InsertEvent<User>) {
    const { password } = event.entity;
    console.log('🚀 ~ UsersSubscriber ~ BeforeInsert ~ password:', password);
    event.entity.password = await this.hashServise.hash(password);
  }
}
