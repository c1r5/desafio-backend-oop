import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

export type User = {
  userId: string
  name: string
  email: string
  phone: string
  password: string
  document: string
  createdAt: Date
  updatedAt: Date
  lastLogin: Date
}

@Entity({ name: "users" })
export default class UserEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid'})
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

  @Column({ type: 'numeric' })
  createdAt!: number;

  @Column({ type: 'numeric' })
  updatedAt!: number;

  @Column({ type: 'numeric' })
  lastLogin!: number;

  static from(user: User) : UserEntity {
    let user_entity = new UserEntity()
    user_entity.name = user.name
    user_entity.email = user.email
    user_entity.phone = user.phone
    user_entity.document = user.document
    user_entity.password = user.password
    user_entity.password = user.password
    user_entity.createdAt = user.createdAt.getTime()
    user_entity.updatedAt = user.updatedAt.getTime()
    user_entity.lastLogin = user.lastLogin.getTime()
    return user_entity
  }
}
