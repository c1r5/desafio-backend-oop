import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";

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

  @Column({ type: 'varchar', length: 100})
  type!: "pj" | "pf";

  @Column({ type: 'bigint', default: 0})
  balance!: BigInt

  @Column({ type: 'numeric', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: number;

  @Column({ type: 'numeric', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: number;
}
