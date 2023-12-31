import { Car } from "src/car/entities/car.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name:string;

    @ManyToOne(()=>Car, (car)=>car.id)
    @JoinColumn({ name: "describes" })
    describes: Car;
}