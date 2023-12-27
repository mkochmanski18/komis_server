import { Fuel } from "src/enums/fuel.enum";
import { Transmission } from "src/enums/transmission.enum";
import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne,  OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./reservation.entity";

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
}