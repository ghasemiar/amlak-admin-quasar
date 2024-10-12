import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { UserRole } from 'src/types';
export class UserTag {
  @Expose()
  id: number;
  @Expose()
  name: string;
}
export class UserDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  username: string;
  @Expose()
  role: UserRole;
  @Expose()
  phone: string;
  @Expose()
  @Type(() => UserTag)
  @Transform((obj) => {
    if (Array.isArray(obj.value) && obj.value.length > 0) {
      return obj.value.map((item) => item.name).join(' - ');
    } else {
      return 'no tag';
    }
  })
  userTag: string;
  @Expose()
  profile: object;
  @Expose()
  advertise: object;
  @Expose()
  completeProfile: boolean;
}
export class UserListDto extends UserDto {
  @Expose()
  @Type(() => UserDto)
  data: UserDto[];
}
export const userTransformer = (response): UserDto => {
  return plainToInstance(UserDto, response.data, {
    excludeExtraneousValues: true,
  });
};
export const userListTransformer = (response): UserDto => {
  return plainToInstance(UserListDto, response.data, {
    excludeExtraneousValues: true,
  });
};
