import { BaseEntity, Column, Entity,JoinColumn,OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Token extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable:true,
        default: null,
    })
    currentToken:string;

    @Column({
        nullable:true,
        default: null,
    })
    agent:string;

    @OneToOne(()=>User,(user)=>user.id)
    @JoinColumn({ name: "user_id" })
    user:User
}