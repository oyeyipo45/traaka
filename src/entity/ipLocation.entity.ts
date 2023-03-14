import { number } from 'joi';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Queries {
  @Column()
  id?: string;

  @Column()
  domain: string;

  @Column()
  long: string;

  @Column()
  lat: string;

  @Column()
  geoname_id: string;

  @Column()
  isActive: Boolean;
}
