import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./car.entity";

@Entity()
export class Reservation extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(()=>Car, (car)=>car.id)
    @JoinColumn({ name: "reservedCar"})
    reservedCar: Car

    @Column()
    dailyCost: number;

    @Column()
    reservationBeginDate:Date;

    @Column()
    reservationEndDate:Date;

    @OneToOne(()=>User, (user)=>user.id)
    @JoinColumn({ name: "reservedBy"})
    reservedBy: User;

    @Column()
    reservationDate:Date;

    @OneToOne(()=>User, (user)=>user.id)
    @JoinColumn({ name: "acceptedBy"})
    acceptedBy: User;

    @Column({
        nullable:true,
    })
    acceptationDate:Date;
}