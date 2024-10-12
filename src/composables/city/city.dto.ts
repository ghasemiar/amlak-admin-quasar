import { Expose, plainToInstance, Type } from 'class-transformer';

export class CityDto {
  @Expose()
  id: number;
  @Expose()
  name: number;
  @Expose()
  province_name: string;
  @Expose()
  lat: number;
  @Expose()
  lng: number;
}
export class CityListDto {
  @Expose()
  @Type(() => CityDto)
  data: CityDto[];
}

export const cityTransformer = (response) => {
  return plainToInstance(CityDto, response, {
    excludeExtraneousValues: true,
  });
};
export const cityListTransformer = (response) => {
  return plainToInstance(CityListDto, response, {
    excludeExtraneousValues: true,
  });
};
