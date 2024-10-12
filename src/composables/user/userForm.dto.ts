import { Expose } from 'class-transformer';
import { UserRole } from 'src/types';

export class UserFormDto {
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
  userTag: number[];
}
