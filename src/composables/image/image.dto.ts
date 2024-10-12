import { Expose, plainToInstance, Type } from 'class-transformer';

export class ImageDto {
  @Expose()
  id: number;
  @Expose()
  url: string;
  @Expose()
  name: string;
  @Expose()
  alt: string;
}
export class ImageListDto extends ImageDto{
  @Expose()
  @Type(() => ImageDto)
  data:ImageDto[]
}
export const imageTransformer = (response) => {
  return plainToInstance(ImageDto,response.data,{excludeExtraneousValues:true})
}
export const imageListTransformer = (response) => {
  return plainToInstance(ImageListDto,response.data,{excludeExtraneousValues:true})
}
