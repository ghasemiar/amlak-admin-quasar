import { Expose, plainToInstance, Type } from 'class-transformer';

export class CategoryDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
}
export class CategoryListDto extends CategoryDto {
  @Expose()
  @Type(() => CategoryDto)
  data: CategoryDto[];
}
export const categoryTransformer = (response): CategoryDto => {
  return plainToInstance(CategoryDto, response, {
    excludeExtraneousValues: true,
  });
};
export const categoryListTransformer = (response): CategoryDto => {
  return plainToInstance(CategoryListDto, response, {
    excludeExtraneousValues: true,
  });
};
