import {
  Entity, PrimaryGeneratedColumn, Column, EntitySchema, BaseEntity,
} from 'typeorm';

interface UserSchema extends EntitySchema {
  id: Number,
  name: String,
  firstName: String,
  lastName: String,
  age: number,
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
