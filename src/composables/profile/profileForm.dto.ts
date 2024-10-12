import { Expose } from 'class-transformer';
import { GenderEnum } from 'src/types';

export class ProfileFormDto {
  @Expose()
  sex?: GenderEnum;
  @Expose()
  birthday?: string;
  @Expose()
  province?: number;
  @Expose()
  city?: number;
  @Expose()
  lat?: number;
  @Expose()
  lng?: number;
  @Expose()
  currentLat?: number;
  @Expose()
  currentLng?: number;
}
