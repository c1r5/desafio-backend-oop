import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

export type Transaction = {
  transactionId: string,
  status: "pending" | "completed" | "failed";
  amount: BigInt
  type: "payment" | "refund" | "transfer" | "adjustment";
  payer: string,
  recipient: string
}

@Entity({ schema: 'transaction' })
export default class TransactionEntity extends BaseEntity {
  @PrimaryColumn({type: 'uuid'})
  transactionId!: string;
  @Column({type: 'varchar', length: 50})
  status!: string;
  @Column({ type: 'bigint'})
  amount!: BigInt
  @Column({ type: 'varchar', length: 50})
  type!: string
  @Column({type: 'uuid'})
  payer!: string
  @Column({type: 'uuid'})
  recipient!: string

  static from(transaction: Transaction) {
    const entity = new TransactionEntity()
    entity.transactionId = transaction.transactionId
    entity.status = transaction.status
    entity.amount = transaction.amount
    entity.type = transaction.type
    entity.payer = transaction.payer
    entity.recipient = transaction.recipient
    return entity
  }
}