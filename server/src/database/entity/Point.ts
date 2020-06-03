import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';

@Entity({ name: 'points' })
export class Point extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  image!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  whatsapp!: string;

  @Column({ type: 'decimal' })
  latitude!: number;

  @Column({ type: 'decimal' })
  longitude!: number;

  @Column()
  city!: string;

  @Column({ length: 2 })
  uf!: string;
}
