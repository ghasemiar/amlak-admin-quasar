<template>
  <div class="tw-m-10">
    <q-form @submit="onSubmit" class="tw-grid tw-gap-5">
      <q-input
        filled
        type="textarea"
        v-model="text"
        :label="$t('text')"
        :error="!!textError"
        :error-message="textError"
      />
      <q-input
        filled
        v-model="domain"
        :label="$t('domain')"
        :error="!!domainError"
        :error-message="domainError"
      />
      <q-btn type="submit" :label="$t('submit')" color="teal" />
    </q-form>
  </div>
</template>
<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { useSendSmsWithDomainValidation } from 'src/composables/sendSms/sendSms.validate';
import {
  useSendSmsSimple,
  useSendSmsWithDomain,
} from 'src/composables/sendSms/useSendSms';
interface PropsI {
  phoneNumber: string;
}
const props = defineProps<PropsI>();

const { loading, request } = useSendSmsWithDomain();
const { handleSubmit } = useForm({
  validationSchema: useSendSmsWithDomainValidation(),
});
const { value: text, errorMessage: textError } = useField<string>('text');
const { value: domain, errorMessage: domainError } = useField<string>('domain');
const onSubmit = handleSubmit(async (values) => {
  request({
    ...values,
    user: props.phoneNumber,
  });
});
</script>
