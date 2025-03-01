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
  @PrimaryColumn()
  userId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;
  
  @Column({ unique: true })
  document: string;

  @Column()
  password: string;


  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'timestamptz' })
  lastLogin: Date;

  constructor(user: User) {
    super();
    this.userId = user.userId;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.password = user.password;
    this.document = user.document;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.lastLogin = user.lastLogin;
  }
}
