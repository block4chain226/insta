import { IdentityAbstract } from 'libs/common/abstract/identity-entity.abstract';
import { Column, Entity } from 'typeorm';
import { User as UserModel } from '../../domain/model/User.model';

@Entity('users')
export class User extends IdentityAbstract {
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  email: string;
  @Column({ type: 'varchar' })
  password: string;

  // get toModel(): UserModel {
  //   return new UserModel(this.id, this.name, this.email, this.password);
  // }

  // static fromModel(model: UserModel): User {
  //   const entity = new User();
  //   entity.id = model.id;
  //   entity.name = model.name;
  //   entity.email = model.email;
  //   entity.password = model.password;
  //   return entity;
  // }
}
