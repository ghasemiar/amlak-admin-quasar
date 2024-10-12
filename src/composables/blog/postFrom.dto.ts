import { TagDto } from 'src/composables/tag/tag.dto';
import { CategoryDto } from 'src/composables/category/category.dto';
import { Expose, plainToInstance, Transform, Type } from 'class-transformer';

export class PostFromDto {
  @Expose()
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((tag: TagDto) => tag.id) : []
  )
  tags: number[];

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  slug: string;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((cat: CategoryDto) => cat.id) : []
  )
  categories: number[];
  @Expose()
  @Transform(({ value }) => {
    if (value && Array.isArray(value)) {
      return value.join(', ')
    }
  })
  keywords: string;
  @Expose()
  isPublish: boolean;
  @Expose()
  excerpt:string
  @Expose()
  related_post?:number[]
}

export const transformPostFrom = (data) => {
  return plainToInstance(PostFromDto, data, { excludeExtraneousValues: true });
};
