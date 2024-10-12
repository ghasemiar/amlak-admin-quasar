import { Expose, plainToInstance, Type } from 'class-transformer';

export class UserTagDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
}
export class UserTagListDto extends UserTagDto {
  @Expose()
  @Type(() => UserTagDto)
  data: UserTagDto[];
}
export const userTagTransformer = (response): UserTagDto => {
  return plainToInstance(UserTagDto, response, {
    excludeExtraneousValues: true,
  });
};
export const userTagListTransformer = (response): UserTagDto => {
  return plainToInstance(UserTagListDto, response, {
    excludeExtraneousValues: true,
  });
};
