import { Expose } from 'class-transformer';
export class LocationFormDto {
  @Expose()
  name: string;
  @Expose()
  explanation: string;
}
