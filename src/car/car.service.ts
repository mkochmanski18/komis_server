import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NewCarDto } from './dto/newCar.dto';
import { Car } from './car.entity';
import { UpdateCarDto } from './dto/updateCar.dto';
import { CarInterface } from 'src/interfaces/car';
import { Reservation } from './reservation.entity';
import { ReservationDto } from './dto/reservation.dto';

@Injectable()
export class CarService {
    async fetchRentalCars(): Promise<Car[]> {
        const cars = await Car.find({relations:{reservation:true}});
        let newArray:Car[] = [];
        cars.forEach(car=>{
            if(car.reservation === null) newArray.push(car);
        })
        console.log(newArray)
        return newArray;
    }
    
    async fetchOneCar(carId: string): Promise<Car> {
            const car = await Car.findOneBy({id:carId});
            const car = await Car.findOne({where:{id:carId},relations:{equipment:true,photos:true}});
            if(!car) throw new HttpException('Car does not exist.', HttpStatus.NOT_FOUND);
            return car;
    }
    
    async fetchAll(): Promise<CarInterface[]> { 
            const cars = Car.find();
            const cars = Car.find({relations:{equipment:true,photos:true}});
            return cars;
    }

    async fetchAllEquipments(): Promise<Equipment[]> {
        const eq = await Equipment.find();
        return eq;
    }

    addEq(name:string): Equipment {
        const eq = new Equipment();
        eq.name = name;
        eq.save();
        return eq;
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

    async makeReservation(req: any,resBody:ReservationDto): Promise<string> {
        
        const car = await Car.findOne({where:{id:resBody.carId},relations:{reservation:true}});
        if(!car) throw new HttpException('Car does not exist.', HttpStatus.NOT_FOUND)
        if(car.reservation) throw new HttpException('Car is already reserved by someone.', HttpStatus.CONFLICT)
        const newReservation = new Reservation();
        newReservation.reservedBy = req.user;
        newReservation.reservationDate = new Date();
        newReservation.reservedCar = car;
        newReservation.monthlyCost = resBody.monthlyCost;
        newReservation.reservationBeginDate = resBody.reservationBeginDate;
        newReservation.reservationEndDate = resBody.reservationEndDate;
        newReservation.save();
        return "reserved";    
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

    async updateCarEquipment(carId:string, carEqBody: string[]): Promise<Equipment[]> {
        const car = await Car.findOne({where:{id:carId},relations:{equipment:true}});
        if(!car) throw new HttpException('Car does not exist.', HttpStatus.NOT_FOUND)
        let newEquipment:Equipment[] = [];
        carEqBody.forEach(async eq=>{
            const searchEq = await Equipment.findOne({where:{name:eq}});
            if(!searchEq) throw new HttpException('Bad request.', HttpStatus.BAD_REQUEST)
            newEquipment.push(searchEq);
        });
        car.equipment = newEquipment;
        car.save();
        const newCar = await Car.findOne({where:{id:carId},relations:{equipment:true}});
        return newCar.equipment;
    }

}
