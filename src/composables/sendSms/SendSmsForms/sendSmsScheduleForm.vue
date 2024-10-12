<template>
  <div class="tw-m-10">
    <q-form @submit="onSubmit" class="tw-grid tw-gap-5">
      <div class="tw-grid lg:tw-grid-cols-2 tw-gap-5">
        <q-input
          filled
          v-model="date"
          :label="$t('date')"
          :error="!!dateError"
          :error-message="dateError"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="date"
                  mask="YYYY-MM-DD HH:mm"
                  calendar="persian"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          filled
          v-model="period"
          type="number"
          :label="$t('period')"
          :error="!!periodError"
          :error-message="periodError"
        />
      </div>
      <q-input
        filled
        type="textarea"
        v-model="message"
        :label="$t('message')"
        :error="!!messageError"
        :error-message="messageError"
      />

      <q-btn type="submit" :label="$t('submit')" color="teal" />
    </q-form>
  </div>
</template>
<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { useSendSmsScheduleValidation } from 'src/composables/sendSms/sendSms.validate';
import {
  useSendSmsSchedule,
  useSendSmsSimple,
} from 'src/composables/sendSms/useSendSms';
interface PropsI {
  phoneNumber: string;
}
const props = defineProps<PropsI>();

const { loading, request } = useSendSmsSchedule();
const { handleSubmit } = useForm({
  validationSchema: useSendSmsScheduleValidation(),
  initialValues: {
    date: '2023-02-01 12:44',
  },
});
const { value: message, errorMessage: messageError } =
  useField<string>('message');
const { value: date, errorMessage: dateError } = useField<string>('date');
const { value: period, errorMessage: periodError } = useField<string>('period');
const onSubmit = handleSubmit(async (values) => {
  request({
    ...values,
    user: props.phoneNumber,
  });
});
</script>
