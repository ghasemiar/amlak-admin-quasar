import { Expose } from 'class-transformer';
export class LoginFormDto {
  @Expose()
  username: string;
  @Expose()
  password: string;
}
