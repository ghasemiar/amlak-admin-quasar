import { Expose, Type } from 'class-transformer';
import { AdvertiseType, CoolingType, HeatingType, HouseType } from 'src/types';
import { LocationDto } from 'src/composables/Location/location.dto';

export class UserRequestAdvertiseFormDto {
  @Expose()
  type: AdvertiseType;
  @Expose()
  min_price: number;
  @Expose()
  max_price: number;
  @Expose()
  min_area: number;
  @Expose()
  max_area: number;
  @Expose()
  location: number;
  @Expose()
  house_type?: HouseType;
  @Expose()
  room_count?: number;
  @Expose()
  building_age?: number;
  @Expose()
  heating?: HeatingType;
  @Expose()
  cooling?: CoolingType;
  @Expose()
  car_park_count?: number;
}
