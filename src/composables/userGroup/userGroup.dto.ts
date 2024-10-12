import { Expose, plainToInstance, Type } from 'class-transformer';
import { UserDto } from 'src/composables/user/user.dto';

export class UserGroupDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  @Type(() => UserDto)
  user:UserDto[]
}
export class UserGroupListDto extends UserGroupDto {
  @Expose()
  @Type(() => UserGroupDto)
  data: UserGroupDto[];
}
export const userGroupTransformer = (response): UserGroupDto => {
  return plainToInstance(UserGroupDto, response, {
    excludeExtraneousValues: true,
  });
};
export const userGroupListTransformer = (response): UserGroupDto => {
  return plainToInstance(UserGroupListDto, response, {
    excludeExtraneousValues: true,
  });
};
