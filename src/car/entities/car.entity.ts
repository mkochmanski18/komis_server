import { Fuel } from "src/enums/fuel.enum";
import { Transmission } from "src/enums/transmission.enum";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,  OneToMany,  OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./reservation.entity";
import { Equipment } from "./equipment.entity";
import { CarType } from "src/enums/carType.enum";
import { Photo } from "src/photo/photo.entity";

@Entity()
export class Car extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 25,
    })
    make:string;

    @Column({
        length: 25,
    })
    model:string;

    @Column()
    fuelType:Fuel;

    @Column({
        length: 25,
    })
    engine:string;

    @Column({
        length: 10,
    })
    power:string;

    @Column()
    kilometers:number;

    @Column()
    transmission:Transmission;

    @Column()
    productionYear:number;

    @Column()
    seats:number;

    @Column()
    type:CarType;

    @Column()
    rentTotalCost: number;

    @Column({
        default: false
    })
    visibility:boolean;
    
    @ManyToOne(()=>User, (user)=>user.id)
    @JoinColumn({ name: "createdBy" })
    createdBy: User;

    @Column({
        nullable:true,
    })
    creationDate:Date;

    @ManyToOne(()=>User, (user)=>user.id)
    @JoinColumn({ name: "modifiedBy" })
    modifiedBy: User;

    @Column({
        nullable:true,
    })
    modificationDate:Date;

    @OneToOne(()=>Reservation,(res)=>res.reservedCar)
    reservation: Reservation;

    @ManyToMany(()=>Equipment)
    @JoinTable()
    equipment: Equipment[];

    @OneToMany(()=>Photo,(photo)=>photo.describes)
    photos:Photo[];
}