import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";

@Entity({ schema: 'transaction' })
export default class TransactionEntity extends BaseEntity {
  @PrimaryColumn({type: 'uuid'})
  transactionId!: string;
  @Column({type: 'varchar', length: 50, default: "pending"})
  status!: string;
  @Column({ type: 'decimal', precision: 18, scale: 2})
  amount!: string;
  @Column({ type: 'varchar', length: 50})
  type!: string
  @Column({type: 'uuid'})
  payer!: string
  @Column({type: 'uuid'})
  recipient!: string
}