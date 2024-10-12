import { TagDto } from 'src/composables/tag/tag.dto';
import { CategoryDto } from 'src/composables/category/category.dto';
import { Expose, plainToInstance, Transform, Type } from 'class-transformer';

export class PostDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => TagDto)
  tags: string;

  @Expose()
  @Type(() => TagDto)
  @Transform(({ obj }) => {
    if (obj.tags && Array.isArray(obj.tags)) {
      // Return the joined tag names
      return obj.tags.map((tag: TagDto) => tag.name).join('-');
    }
    return ''; // Return an empty string if no tags
  })
  tags_show: string;

  @Expose()
  title: string;

  @Expose()
  slug: string;

  @Expose()
  content: string;

  @Expose()
  image?: string;

  @Expose()
  @Type(() => CategoryDto)
  @Transform(({ obj }) => {
    if (obj.categories && Array.isArray(obj.categories)) {
      // Return the joined category names
      return obj.categories.map((cat: CategoryDto) => cat.name).join('-');
    }
    return ''; // Return an empty string if no categories
  })
  categories_show: string;

  @Expose()
  @Type(() => CategoryDto)
  categories: string;

  @Expose()
  isPublish: boolean;

  @Expose()
  description: string;

  @Expose()
  excerpt: string;

  @Expose()
  @Transform(({ obj }) => {
    if (obj.keywords) {
      return obj.keywords.split(', ');
    }
    return []; // Return an empty array if no keywords
  })
  keywords: string[];

  @Expose()
  @Type(() => PostDto)
  related_post?: PostDto[];
}

export class PostListDto extends PostDto {
  @Expose()
  @Type(() => PostDto)
  data: PostDto[];
}

export const postTransformer = (response) => {
  return plainToInstance(PostDto, response.data, {
    excludeExtraneousValues: true,
  });
};

export const postListTransformer = (response) => {
  return plainToInstance(PostListDto, response.data, {
    excludeExtraneousValues: true,
  });
};
