import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";

export type UserID = string;
export type UserType = "pj" | "pf";
export type UserStatus = "active" | "inactive" | "blocked";

@Entity({name: "users"})
export default class UserEntity extends BaseEntity {
    @PrimaryColumn({type: 'uuid', generated: 'uuid'})
    userId!: UserID;

    @Column({type: 'varchar', length: 100})
    name!: string;

    @Column({unique: true, type: 'varchar', length: 100})
    email!: string;

    @Column({unique: true, type: 'varchar', length: 30})
    phone!: string;

    @Column({unique: true, type: 'varchar', length: 20})
    document!: string;

    @Column({type: 'varchar', length: 100})
    password!: string;

    @Column({type: 'varchar', length: 100})
    type!: UserType;

    @Column({type: 'varchar', length: 100, default: "inactive"})
    status!: UserStatus;

    @Column({type: 'bigint', default: 0})
    balance!: BigInt

    @Column({type: 'numeric', default: () => 'CURRENT_TIMESTAMP'})
    createdAt!: number;

    @Column({type: 'numeric', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt!: number;
}
