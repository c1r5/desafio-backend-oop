import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

export type User = {
  userId?: string
  name: string
  email: string
  phone: string
  password: string
  document: string
  createdAt?: Date
  updatedAt?: Date
  lastLogin?: Date
}

@Entity({ name: "users" })
export default class UserEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid'})
  userId!: string;

  @Column({ type: 'varchar', length: 100})
  name!: string;

  @Column({ unique: true, type: 'varchar', length: 100 })
  email!: string;

  @Column({ unique: true, type: 'varchar', length: 30 })
  phone!: string;
  
  @Column({ unique: true, type: 'varchar', length: 20 })
  document!: string;

  @Column({ type: 'varchar', length: 100})
  password!: string;

  @Column({ type: 'bigint', default: 0})
  balance!: BigInt

  @Column({ type: 'numeric', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: number;

  @Column({ type: 'numeric', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: number;

  static from(user: User) : UserEntity {
    let user_entity = this.create()
    user_entity.name = user.name
    user_entity.email = user.email
    user_entity.phone = user.phone
    user_entity.document = user.document
    user_entity.password = user.password
    return user_entity
  }
}
