import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class SessionEntity {
    @PrimaryGeneratedColumn('uuid')
    session_id!: string;
    @Column({type: 'uuid'})
    userId!: string;
    @Column({type: 'numeric', default: () => 'CURRENT_TIMESTAMP'})
    createdAt!: number;
    @Column({type: 'numeric', default: 1})
    expiresIn!: number;
    @Column({type: 'boolean', default: false})
    is_active!: boolean;
}