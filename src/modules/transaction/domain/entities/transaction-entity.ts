import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import TransactionModel from "../models/transaction-model";

@Entity({schema: 'transaction'})
export default class TransactionEntity extends BaseEntity {
  @PrimaryColumn()
  transactionId: string
  @Column()
  status: string
  @Column()
  amount: BigInt
  @Column()
  type: string
  @Column()
  payer: string
  @Column()
  recipient: string

  constructor(transaction: TransactionModel) {
    super()

    this.transactionId = transaction.transactionId
    this.status = transaction.status
    this.amount = transaction.amount
    this.type = transaction.type
    this.payer = transaction.payer
    this.recipient = transaction.recipient
  }
}