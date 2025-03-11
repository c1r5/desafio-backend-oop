import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class AuthSessionEntity {
    @PrimaryGeneratedColumn('uuid')
    sid!: string;
    @Column({type: 'uuid'})
    userId!: string;
    @Column({type: 'numeric', default: () => 'CURRENT_TIMESTAMP'})
    createdAt!: number;
    @Column({type: 'numeric', default: 1})
    expiresIn!: number;
}