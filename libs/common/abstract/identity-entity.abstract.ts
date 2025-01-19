import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IdentityAbstract {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
