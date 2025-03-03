import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";

export type TransactionStatus = "pending" | "completed" | "failed";
export type TransactionType = "payment" | "refund" | "transfer" | "adjustment";

@Entity({ schema: 'transaction' })
export default class TransactionEntity extends BaseEntity {
  @PrimaryColumn({type: 'uuid'})
  transactionId!: string;
  @Column({type: 'varchar', length: 50, default: "pending"})
  status!: TransactionStatus;
  @Column({ type: 'bigint', default: BigInt(0)})
  amount!: BigInt
  @Column({ type: 'varchar', length: 50})
  type!: TransactionType
  @Column({type: 'uuid'})
  payer!: string
  @Column({type: 'uuid'})
  recipient!: string
}