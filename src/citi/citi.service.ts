import { Injectable } from '@nestjs/common';
import { CreateCitiDto } from './dto/create-citi.dto';
import { UpdateCitiDto } from './dto/update-citi.dto';
import { InjectModel } from '@nestjs/mongoose';
import { City_db, City_dbDocument } from './schema/city_db';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class CitiService {
  constructor(@InjectModel(City_db.name) private CityModel:Model<City_dbDocument> ){}
  create(createCitiDto: CreateCitiDto) : Promise<City_db> {
    const model=new this.CityModel();
    model.city=createCitiDto.city;
    return model.save();
  }

  findAll() {
    return this.CityModel.find().exec();
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
