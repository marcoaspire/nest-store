import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductImage } from "./product-image.entity";
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'products'})
export class Product {
    
    @ApiProperty({
        example: 'e2ca66e7-36f3-4152-a5f2-9dfe1f606989',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'Black t-shirt',
        description: 'Product title'
    })
    @Column('text',{
        unique: true,
    })
    title:string;

    @ApiProperty()
    @Column('float',{
        default: 0
    })
    price:number;

    @ApiProperty()
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: 'headphones_new',
        description: 'Product SLUG - for SEO',
        uniqueItems: true
    })
    @Column('text',{
        unique: true
    })
    slug: string;

    @Column('int',{
        default: 0,
    })
    stock:number;

    @ApiProperty()
    @Column('text',{
        array: true
    })
    sizes: string [];

    @ApiProperty()
    @Column('text')
    gender: string;


    @ApiProperty()
    @Column('text',{
        default: [],
        array: true
    })
    tags: string [];

    @OneToMany(
        function () { return ProductImage },
        (productImage) => productImage.product,
        {cascade: true, eager: true}
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        (user) => user.product,
        {eager: true}
    )
    user: User;



    @BeforeInsert()
    checkSlugInsert(){
        if ( !this.slug ){
            this.slug = this.title;
        }
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'');
    }


    @BeforeUpdate()
    checkSlugUpdate(){
        if ( !this.slug ){
            this.slug = this.title;
        }
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'');
    }

}
