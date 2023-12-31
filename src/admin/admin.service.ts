import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Car } from 'src/car/entities/car.entity';
import { Reservation } from 'src/car/entities/reservation.entity';
import { CarInterface } from 'src/interfaces/car';
import { StandardUserInterface } from 'src/interfaces/user';
import { User } from 'src/user/entities/user.entity';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class AdminService {
   
    standardUserFilter(user:User):StandardUserInterface{
        const {id, name, gender, email, firstname, lastname,role} = user;
        return {id,name,firstname, lastname, gender, email,role};
    }

    async getAdmins(): Promise<StandardUserInterface[]> {
            const admins = await User.find({where:[{role:2},{role:3}]});
            let newAdminArray:StandardUserInterface[] = [];
            admins.forEach(user=>{
                newAdminArray.push(this.standardUserFilter(user))
              })
            return newAdminArray;
    }

    async updateCarVisibility(carId: any, newValue: any): Promise<string> {
            const car= await Car.findOne({where:{id:carId}});
            if(!car) throw new HttpException('Car does not exist.', HttpStatus.NOT_FOUND);
            car.visibility = newValue;
            car.save();
            return "Visibility changed on "+newValue;
    }
    async updateRole(userId: any, newRole: any): Promise<string> {
            const user= await User.findOne({where:{id:userId}});
            if(!user) throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
            user.role = newRole;
            user.save();
            return "Role updated";
    }

    async acceptReservation(req:any, resId: string): Promise<string> {
        const reservation = await Reservation.findOne({where:{id:resId}});
        if(!reservation) throw new HttpException('Reservation does not exist.', HttpStatus.NOT_FOUND);
        reservation.acceptedBy = req.user;
        reservation.acceptationDate = new Date();
        reservation.save();
        return "reservation accepted";
    }
    
    async fetchByCreator(userId: string): Promise<Car[]> {
            const user = await User.findOne({where:{id:userId}});
            if(!user)throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
            const cars = await Car.find({where:{visibility:true,createdBy:(user as unknown as FindOptionsWhere<User>)}})
            return cars;
    }
    
    async fetchAll(): Promise<CarInterface[]> { 
            const cars = Car.find();
            return cars;
    }


}
