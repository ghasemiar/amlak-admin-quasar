import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { getCurrentInstance } from 'vue';

export function useCreateUserGroupSchema() {
  const instance = getCurrentInstance()?.proxy?.$t;
  return toTypedSchema(
    yup.object({
      title: yup.string().required(instance!('is required')),
      user:yup.array().required(instance!('is required'))
    })
  );
}
export const userGroupColumns: string[] = ['id', 'title', 'action'];
