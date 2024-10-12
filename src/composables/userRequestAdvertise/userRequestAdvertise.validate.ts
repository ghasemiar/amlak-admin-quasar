import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { getCurrentInstance } from 'vue';

export function useCreateUserRequestAdvertiseSchema() {
  const instance = getCurrentInstance()?.proxy?.$t;
  return toTypedSchema(
    yup.object({
      type: yup.string().required(instance!('is required')),
      min_price: yup
        .number()
        .required(instance!('is required'))
        .min(0, instance!('must be positive')),
      max_price: yup
        .number()
        .required(instance!('is required'))
        .min(0, instance!('must be positive')),
      min_area: yup
        .number()
        .required(instance!('is required'))
        .min(0, instance!('must be positive')),
      max_area: yup
        .number()
        .required(instance!('is required'))
        .min(0, instance!('must be positive')),
      location: yup.number().required(instance!('is required')),
      house_type: yup.string().nullable(),
      room_count: yup.number().nullable().min(1),
      building_age: yup.number().nullable().min(0),
      heating: yup.string().nullable(),
      cooling: yup.string().nullable(),
      car_park_count: yup.number().nullable().min(0),
    })
  );
}
export const userRequestAdvertiseColumns: string[] = ['id', 'type', 'action'];
export const userRequestAdvertiseInfoColumns: string[] = [
  'id',
  'type',
  'min_price',
  'max_price',
  'min_area',
  'max_area',
  'location_name',
  'location_explanation',
  'house_type',
  'room_count',
  'building_age',
  'heating',
  'cooling',
];
