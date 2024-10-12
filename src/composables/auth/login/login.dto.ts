import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/composables/user/user.dto';
export class LoginDto {
  @Expose()
  @Type(() => UserDto)
  data: UserDto;
  @Expose()
  msg: string;
  @Expose()
  token: string;
}
