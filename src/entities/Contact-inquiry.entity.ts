import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'contact-inquiries'
})
export class ContactInquiry extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({
        nullable: true,
        default: ''
    })
    subject: string;

    @Column()
    message: string;

    @Column({
        nullable: false
    })
    createdAt: Date;

}