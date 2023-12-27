import { Gender } from "src/enums/gender.enum";
import { Role } from "src/enums/role.enum";

export interface RegisterUserResponse{
    id: string;
    name:string;
    email: string;
}
export interface StandardUserInterface{
    id: string;
    name:string;
    firstname:string;
    lastname:string;
    gender:Gender;
    email: string;
    role?:Role;
}