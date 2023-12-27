import { Fuel } from "src/enums/fuel.enum";
import { Transmission } from "src/enums/transmission.enum";

export interface CarInterface{
    id: string;
    make:string;
    model:string;
    fuelType:Fuel; 
    engine:string;
    power:string;
    kilometers:number;
    transmission:Transmission;
    productionYear:number;
    seats:number;
    visibility: boolean;
}