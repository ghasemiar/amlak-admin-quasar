import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

export const advertiseCategorySchema = (t) => {
  return toTypedSchema(
    yup.object({
      title: yup.string().required(t('is required')),
      type: yup.string().required(t('is required')),
      description: yup.string().required(t('is required')),
      address: yup.string().required(t('is required')),
      price: yup
        .number()
        .required(t('is required'))
        .min(0, t('must be positive')),
      area: yup
        .number()
        .required(t('is required'))
        .min(0, t('must be positive')),
      lat: yup.number().required(t('is required')),
      lng: yup.number().required(t('is required')),
      location: yup.number().required(t('is required')),
      house_type: yup.string().nullable(),
      room_count: yup.number().nullable().min(1),
      building_age: yup.number().nullable().min(0),
      heating: yup.string().nullable(),
      cooling: yup.string().nullable(),
      car_park_count: yup.number().nullable().min(0),
      image: yup
        .mixed()
        .nullable()
        .test('fileSize', 'The file is too large', (value: unknown) => {
          if (!value || !(value instanceof FileList) || value.length === 0)
            return true;
          return value[0].size <= 5000000; // 5MB
        })
        .test('fileType', 'Only images are allowed', (value: unknown) => {
          if (!value || !(value instanceof FileList) || value.length === 0)
            return true;
          return ['image/jpeg', 'image/png', 'image/gif'].includes(
            value[0].type
          );
        }),
    })
  );
};
export const advertiseColumn: string[] = ['id', 'title', 'price', 'action'];
export const advertiseInfoColumn: string[] = [
  'id',
  'title',
  'type',
  'price',
  'area',
];
export const advertiseHouseInfoColumn: string[] = [
  'house_type',
  'room_count',
  'building_age',
  'heating',
  'cooling',
  'car_park_count',
];
