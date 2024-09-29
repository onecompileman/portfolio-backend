import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'newsletters'
})
export class Newsletter extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        nullable: true
    })
    unsubscribe: boolean;

    @Column()
    createdAt: Date;

}