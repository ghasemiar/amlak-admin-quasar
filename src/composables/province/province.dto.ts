import { Expose, plainToInstance, Type } from 'class-transformer';

export class ProvinceDto {
  @Expose()
  id: number;
  @Expose()
  name: number;
}
export class ProvinceListDto {
  @Expose()
  @Type(() => ProvinceDto)
  data: ProvinceDto[];
}

export const provinceTransformer = (response) => {
  return plainToInstance(ProvinceDto, response, {
    excludeExtraneousValues: true,
  });
};
export const provinceListTransformer = (response) => {
  return plainToInstance(ProvinceListDto, response, {
    excludeExtraneousValues: true,
  });
};
