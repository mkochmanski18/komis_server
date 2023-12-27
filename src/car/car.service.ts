import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NewCarDto } from './dto/newCar.dto';
import { Car } from './car.entity';
import { UpdateCarDto } from './dto/updateCar.dto';
import { CarInterface } from 'src/interfaces/car';
import { Reservation } from './reservation.entity';
import { ReservationDto } from './dto/reservation.dto';

@Injectable()
export class CarService {
    
    async fetchOneCar(carId: string): Promise<Car> {
            const car = await Car.findOneBy({id:carId});
            if(!car) throw new HttpException('Car does not exist.', HttpStatus.NOT_FOUND);
            return car;
    }
    
    async fetchAll(): Promise<CarInterface[]> { 
            const cars = Car.find();
            return cars;
    }

    async newCar(carBody: NewCarDto,req:any): Promise<string> {
            const user = req.user;
            if(!user) throw new HttpException('Server error.', HttpStatus.INTERNAL_SERVER_ERROR)

            const {make, model, fuelType, engine, power, kilometers, transmission, productionYear, seats,rentTotalCost} = carBody;
            const newCar = new Car();
            newCar.make = make;
            newCar.model = model,
            newCar.fuelType = fuelType;
            newCar.engine = engine;
            newCar.power = power;
            newCar.kilometers = kilometers;
            newCar.transmission = transmission;
            newCar.productionYear = productionYear;
            newCar.seats = seats;
            newCar.rentTotalCost = rentTotalCost;
            newCar.creationDate = new Date();
            
            newCar.createdBy = user;
            newCar.save();
            return newCar.id;       
    }

    async updateCar(carBody:UpdateCarDto|UpdateCarDto[]):Promise<string>{
        if(Array.isArray(carBody)){
            carBody.forEach(async object=>{
                    const {make, model, fuelType, engine, power, kilometers, transmission, productionYear, seats, rentTotalCost, carId} = object;
                    const car = await Car.findOne({where:{id:carId}});
                    if(!car) throw new HttpException('Car does not exist.', HttpStatus.NOT_FOUND)
                    
                    car.make = make;
                    car.model = model,
                    car.fuelType = fuelType;
                    car.engine = engine;
                    car.power = power;
                    car.kilometers = kilometers;
                    car.transmission = transmission;
                    car.productionYear = productionYear;
                    car.seats = seats;
                    car.rentTotalCost = rentTotalCost;
                    car.modificationDate = new Date();
                    car.save();    
            })
        }
        else{
            
                const {make, model, fuelType, engine, power, kilometers, transmission, productionYear, seats, carId} = carBody;
                const car = await Car.findOne({where:{id:carId}});
                if(!car) throw new HttpException('Car does not exist.', HttpStatus.NOT_FOUND)
                
                car.make = make;
                car.model = model,
                car.fuelType = fuelType;
                car.engine = engine;
                car.power = power;
                car.kilometers = kilometers;
                car.transmission = transmission;
                car.productionYear = productionYear;
                car.seats = seats;
                car.save();   
        }
        return "ok";
    }
}
