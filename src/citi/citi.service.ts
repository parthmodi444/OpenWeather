import { Injectable } from '@nestjs/common';
import { CreateCitiDto } from './dto/create-citi.dto';
import { UpdateCitiDto } from './dto/update-citi.dto';
import { InjectModel } from '@nestjs/mongoose';
import { City_db, City_dbDocument } from './schema/city_db';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import axios from "axios"
import { response } from 'express';



@Injectable()
export class CitiService {
  constructor(@InjectModel(City_db.name) private CityModel:Model<City_dbDocument> , private readonly httpService: HttpService){}
  create(createCitiDto: CreateCitiDto) : Promise<City_db> {
    const model=new this.CityModel();
    model.city=createCitiDto.city;
    return model.save();
  }

  findAll() {
    return this.CityModel.find().exec();
  }
  createdcity(createCitiDto: CreateCitiDto) : any {
    const temp=(this.httpService.get(`https://api.openweathermap.org/data/2.5/weather?q=${createCitiDto.city}&appid=c136c9782d5d4c1514591bb3463e56be`).pipe(map((response) => response.data.main.temp)));
    return temp;
  }
  findOne(id: number) {
    return `This action returns a #${id} citi`;
  }

  update(id: number, updateCitiDto: UpdateCitiDto) {
    return `This action updates a #${id} citi`;
  }

  remove(id: number) {
    return `This action removes a #${id} citi`;
  }
}
