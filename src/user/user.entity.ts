import { BaseEntity, Column, Entity,JoinColumn,ManyToOne,OneToMany,OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { Token } from "./token.entity";
import { Role } from "src/enums/role.enum";
import { Gender } from "src/enums/gender.enum";
import { Car } from "src/car/car.entity";
import { Reservation } from "src/car/reservation.entity";


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

    @Column({
        default: null,
    })
    salt: string;

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
    currentTokenId: Token;

    @OneToMany(()=>Car, (car)=>car.createdBy)
    createdCars: Car[]
    
    @OneToMany(()=>Car, (car)=>car.modifiedBy)
    modyfiedCars: Car[]

