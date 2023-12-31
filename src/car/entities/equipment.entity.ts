import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./car.entity";

@Entity()
export class Equipment extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name:string;
}