import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinTable, ManyToMany,
} from 'typeorm';

import { Point } from './Point';

@Entity({ name: 'items' })
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  image!: string;

  @ManyToMany((type) => Point, (point:Point) => point.items, {
    cascade: true,
  })
  @JoinTable()
  points!: Point[];
}
