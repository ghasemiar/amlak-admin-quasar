import { Expose, plainToInstance, Type } from 'class-transformer';

export class TagDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
}
export class TagListDto extends TagDto {
  @Expose()
  @Type(() => TagDto)
  data: TagDto[];
}
export const tagTransformer = (response) => {
  return plainToInstance(TagDto, response.data, {
    excludeExtraneousValues: true,
  });
};
export const tagListTransformer = (response) => {
  return plainToInstance(TagListDto, response.data, {
    excludeExtraneousValues: true,
  });
};
