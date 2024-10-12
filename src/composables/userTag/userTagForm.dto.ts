import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/composables/user/user.dto';

export class UserTagCreateDto {
  @Expose()
  name:string
  @Expose()
  @Type(() => UserDto)
  user:UserDto[]
}
