import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { AdvertiseType, CoolingType, HeatingType, HouseType } from 'src/types';
import { LocationDto } from 'src/composables/Location/location.dto';

export class UserRequestAdvertiseDto {
  @Expose()
  id: number;
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
  @Transform(({ obj }) => obj.location.name)
  location_name: string;
  @Expose()
  @Transform(({ obj }) => obj.location.explanation)
  location_explanation: string;
  @Expose()
  @Type(() => LocationDto)
  location: LocationDto;
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
export class UserRequestAdvertiseListDto {
  @Expose()
  @Type(() => UserRequestAdvertiseDto)
  data: UserRequestAdvertiseDto[];
}

export const userRequestAdvertiseTransformer = (response) => {
  return plainToInstance(UserRequestAdvertiseDto, response.data);
};
export const userRequestAdvertiseListTransformer = (response) => {
  return plainToInstance(UserRequestAdvertiseListDto, response.data, {
    excludeExtraneousValues: true,
  });
};
