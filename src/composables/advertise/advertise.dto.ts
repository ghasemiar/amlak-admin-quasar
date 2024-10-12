import { Expose, Type } from 'class-transformer';
import { AdvertiseType, CoolingType, HeatingType, HouseType } from 'src/types';
import { LocationDto } from 'src/composables/Location/location.dto';

export class AdvertiseDto {
  @Expose()
  id: number;
  @Expose()
  type: AdvertiseType;
  @Expose() title: string;
  @Expose() description: string;
  @Expose() address: string;
  @Expose()
  price: number;
  @Expose()
  area: number;
  @Expose()
  image: string;
  @Expose()
  gallery: { id: number; name: string }[];
  @Expose()
  @Type(() => LocationDto)
  location: LocationDto;
  @Expose()
  lat: number;
  @Expose()
  lng: number;
  @Expose()
  @Type(() => AdvertiseAttr)
  advertising_attr?: AdvertiseAttr;
}
export class AdvertiseAttr {
  @Expose()
  house_type: HouseType;
  @Expose()
  room_count: number;
  @Expose()
  building_age: number;
  @Expose()
  heating: HeatingType;
  @Expose()
  cooling: CoolingType;
  @Expose()
  car_park_count: number;
}
