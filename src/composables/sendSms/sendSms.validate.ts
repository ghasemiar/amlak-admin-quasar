import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { getCurrentInstance } from 'vue';

export function useSendSmsSimpleValidation() {
  const instance = getCurrentInstance()?.proxy?.$t;
  return toTypedSchema(
    yup.object({
      text: yup.string().required(instance!('is required')),
    })
  );
}
export function useSendSmsWithDomainValidation() {
  const instance = getCurrentInstance()?.proxy?.$t;
  return toTypedSchema(
    yup.object({
      text: yup.string().required(instance!('is required')),
      domain: yup.string().required(instance!('is required')),
    })
  );
}
export function useSendSmsScheduleValidation() {
  const instance = getCurrentInstance()?.proxy?.$t;
  return toTypedSchema(
    yup.object({
      message: yup.string().required(instance!('is required')),
      date: yup.string().required(instance!('is required')),
      period: yup
        .number()
        .min(0, instance!('must be positive'))
        .max(365, instance!('most be less than') + ' ' + 365)
        .required(instance!('is required')),
    })
  );
}
export function useSendSmsAdvancedValidation() {
  const instance = getCurrentInstance()?.proxy?.$t;
  return toTypedSchema(
    yup.object({
      text: yup.string().required(instance!('is required')),
      user: yup.array().nullable(),
      group: yup.array().nullable(),
    })
  );
}
export const userTagColumns: string[] = ['id', 'text', 'action'];
