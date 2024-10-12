import { Expose, plainToInstance, Transform, Type } from 'class-transformer';

export class UserGroupCreateDto {
  @Expose()
  title:string
  @Expose()
  @Transform(({ value }) => value.map((item)=>item.id))
  user: number[];
}

export const userGroupFormTransformer = (value): UserGroupCreateDto => {
  return plainToInstance(UserGroupCreateDto, value);
};
