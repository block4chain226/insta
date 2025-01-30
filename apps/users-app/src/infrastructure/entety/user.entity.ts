import { IdentityAbstract } from 'libs/common/abstract/identity-entity.abstract';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends IdentityAbstract {
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
}
