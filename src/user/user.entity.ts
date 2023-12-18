import { BaseEntity, Column, Entity,JoinColumn,OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { Token } from "./token.entity";
import { Role } from "src/enums/role.enum";
import { Gender } from "src/enums/gender.enum";


@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 25,
    })
    name: string;

    @Column({
        length: 25,
    })
    firstname: string;

    @Column({
        length: 25,
    })
    lastname: string;

    @Column({
        length: 6,
    })
    gender: Gender;

    @Column({
        length: 25,
    })
    email: string;

    @Column()
    pwdHash: string;

    @Column({
        nullable:true,
        default: 1,
    })
    role:Role;

    @Column({
        default: false,
    })
    activated:boolean;


    @OneToOne(()=>Token, (token)=>token.id)
    currentTokenId: Token

    // @Column({
    //     nullable:true,
    //     default: null,
    // })
    // currentTokenId:string;
}