import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { BlogComment } from "./Blog-comment.entity";

@Entity({
    name: 'blogs'
})
export class Blog extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({
        unique: true
    })
    title: string;

    @Column()
    imageHeaderUrl: string;

    @Column()
    tags: string;

    @Column()
    tagClass: string;

    @Column({
        type: 'text'
    })
    content: string;

    @Column({
        nullable: true,
        type: 'date'
    })
    publishDate: Date | null;

    @Column()
    createdAt: Date;

    @Column({
        nullable: true,
        type: 'date'
    })
    updatedAt: Date;

    @Column()
    views: number;

    @OneToMany((type) => BlogComment, blogComment => blogComment.blog)
    comments: BlogComment[];
}