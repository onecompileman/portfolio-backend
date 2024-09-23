import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./Blog.entity";

@Entity({
    name: 'blog_comments'
})
export class BlogComment extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column()
    comment: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    createdAt: Date;

    @ManyToOne((type) => Blog, { onDelete: 'SET NULL'})
    @JoinColumn({ name: 'blog_id', referencedColumnName: 'id'})
    blog?: Blog;
}