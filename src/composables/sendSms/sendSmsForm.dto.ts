import { Expose, plainToInstance, Transform, Type } from 'class-transformer';

export class SendSmsAdvancedFormDto {
  @Expose()
  text: string;
  @Expose()
  @Transform((obj) => {
    if (obj && Array.isArray(obj.value)) {
      return obj.value.map((item) => item.phone);
    }
  })
  user?: number[];
  @Expose()
  @Transform((obj) => {
    if (obj && Array.isArray(obj.value)) {
      return obj.value.map((item) => item.id);
    }
  })
  group?: number[];
}

export class SendSmsSimpleFormDto {
  @Expose()
  text: string;
  @Expose()
  user: string;
}
export class SendSmsWithDomainFormDto extends SendSmsSimpleFormDto {
  @Expose()
  domain: string;
}
export class SendSmsScheduleFormDto {
  @Expose()
  message: string;

  @Expose()
  date: string;

  @Expose()
  period: number;

  @Expose()
  user: string;
}
export const sendSmsSimpleFormTransformer = (values): SendSmsSimpleFormDto => {
  return plainToInstance(SendSmsSimpleFormDto, values);
};
export const sendSmsAdvancedFormTransformer = (
  values
): SendSmsAdvancedFormDto => {
  return plainToInstance(SendSmsAdvancedFormDto, values);
};

export const sendSmsScheduleFormTransformer = (
  values
): SendSmsScheduleFormDto => {
  return plainToInstance(SendSmsScheduleFormDto, values);
};

export const sendSmsWithDomainFormTransformer = (
  values
): SendSmsWithDomainFormDto => {
  return plainToInstance(SendSmsWithDomainFormDto, values);
};
