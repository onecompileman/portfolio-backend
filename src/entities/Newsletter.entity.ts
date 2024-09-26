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


    @Column()
    createdAt: Date;

}