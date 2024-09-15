import { MinLength } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column('text',{
        unique: true,
    })
    email:string;
    
    @Column('text',{
        select: false
    })
    @MinLength(2)
    password:string;

    @Column('text')
    @MinLength(2)
    fullName:string;

    @Column('bool',{
        default: true
    })
    isActive:boolean;
    
    @Column('text',{
        array: true,
        default: ['user']
    })
    roles: string[];

    @BeforeInsert()
    checkFieldBeforeInsert(){
        this.email = this.email.toLocaleLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldBeforeUpdate(){
        this.checkFieldBeforeInsert();
    }
}
