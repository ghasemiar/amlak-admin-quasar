import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { getCurrentInstance } from 'vue';
import { GenderEnum } from 'src/types';

export function useCreateProfileSchema() {
  const instance = getCurrentInstance()?.proxy?.$t;
  return toTypedSchema(
    yup.object({
      sex: yup.mixed<GenderEnum>().oneOf(Object.values(GenderEnum)),
      birthday: yup.string().nullable(),
      province: yup.number().nullable(),
      city: yup.number().nullable(),
    })
  );
}
export const categoryColumns: string[] = ['id', 'name', 'action'];
