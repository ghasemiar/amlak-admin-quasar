import { Expose } from 'class-transformer';

export class TagCreateDto {
  @Expose()
  name: string;
}
