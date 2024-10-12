import { Expose } from 'class-transformer';

export class CategoryCreateDto {
  @Expose()
  name:string
}
