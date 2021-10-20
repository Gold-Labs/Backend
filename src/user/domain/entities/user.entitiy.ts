import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuthVendor } from '../type/auth-vendor.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email!: string;

  @Column()
  public name!: string;

  @Column({ nullable: true })
  @Exclude()
  public password?: string;

  @Column({
    type: 'enum',
    enum: AuthVendor,
    default: AuthVendor.MAIN,
  })
  public isRegisteredWith!: string;
}
