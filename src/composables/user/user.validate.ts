import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { getCurrentInstance } from 'vue';
import { UserRole } from 'src/types';

export function useCreateUserSchema() {
  const instance = getCurrentInstance()?.proxy?.$t;
  return toTypedSchema(
    yup.object({
      name: yup.string().required(instance!('is required')),
      username: yup.string().required(instance!('is required')),
      phone: yup.string().required(instance!('is required')),
      email: yup.string().email().required(instance!('is required')),
      role: yup
        .mixed<UserRole>()
        .oneOf(Object.values(UserRole))
        .required(instance!('is required')),
      userTag: yup.array().of(yup.number()).required(instance!('is required')),
      password: yup.string().required(instance!('is required')),
    })
  );
}
export const userColumns: string[] = [
  'id',
  'name',
  'email',
  'username',
  'role',
  'userTag',
  'action',
];
