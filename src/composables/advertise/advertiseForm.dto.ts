import { Expose, plainToInstance } from 'class-transformer';
import { AdvertiseType, CoolingType, HeatingType, HouseType } from 'src/types';

export class AdvertiseFormDto {
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
  image?: FileList | null;
  @Expose()
  gallery?: { id: number; name: string }[];
  @Expose()
  location: number;
  @Expose()
  lat: number;
  @Expose()
  lng: number;
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
export const transformAdvertiseFormDto = (data) => {
  return plainToInstance(AdvertiseFormDto, data, {
    excludeExtraneousValues: true,
  });
};
