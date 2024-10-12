import { GenderEnum } from 'src/types';
import { Expose, plainToInstance, Type } from 'class-transformer';
export class ProfileDto {
  @Expose()
  id: number;
  @Expose()
  sex: GenderEnum;
  @Expose()
  birthday: string;
  @Expose()
  image: string;
  @Expose()
  province: number;
  @Expose()
  city: number;
  @Expose()
  lat: number;
  @Expose()
  lng: number;
  @Expose()
  currentLat: number;
  @Expose()
  currentLng: number;
}
export class ProfileListDto {
  @Expose()
  @Type(() => ProfileDto)
  data: ProfileDto[];
}
export const profileTransformer = (response) => {
  return plainToInstance(ProfileDto, response.data, {
    excludeExtraneousValues: true,
  });
};
export const profileListTransformer = (response) => {
  return plainToInstance(ProfileListDto, response, {
    excludeExtraneousValues: true,
  });
};
