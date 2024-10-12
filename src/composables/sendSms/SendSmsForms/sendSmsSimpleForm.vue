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
      <q-btn type="submit" :label="$t('submit')" color="teal" />
    </q-form>
  </div>
</template>
<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { useSendSmsSimpleValidation } from 'src/composables/sendSms/sendSms.validate';
import { useSendSmsSimple } from 'src/composables/sendSms/useSendSms';
interface PropsI {
  phoneNumber: string;
}
const props = defineProps<PropsI>();

const { loading, request } = useSendSmsSimple();
const { handleSubmit } = useForm({
  validationSchema: useSendSmsSimpleValidation(),
});
const { value: text, errorMessage: textError } = useField<string>('text');
const onSubmit = handleSubmit(async (values) => {
  request({
    ...values,
    user: props.phoneNumber,
  });
});
</script>
