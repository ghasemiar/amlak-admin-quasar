import { Expose, plainToInstance, Type } from 'class-transformer';

export class LocationDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  explanation: string;
}
export class LocationListDto extends LocationDto {
  @Expose()
  @Type(() => LocationDto)
  data: LocationDto[];
}
export const transformLocation = (response) => {
  return plainToInstance(LocationDto, response, {
    excludeExtraneousValues: true,
  });
};
export const transformLocationList = (response) => {
  return plainToInstance(LocationDto, response, {
    excludeExtraneousValues: true,
  });
};
