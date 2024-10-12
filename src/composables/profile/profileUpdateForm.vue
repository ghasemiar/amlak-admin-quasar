<template>
  <div class="tw-m-10">
    <q-form @submit="onSubmit" class="tw-grid md:tw-grid-cols-2 tw-gap-5">
      <q-input
        v-model="sex"
        outlined
        :label="$t('sex')"
        :error="!!sexError"
        :error-message="sexError"
        :disable="currentDataLoading"
      />
      <q-input
        v-model="birthday"
        outlined
        :label="$t('birthday')"
        :error="!!birthdayError"
        :error-message="birthdayError"
        :disable="currentDataLoading"
      />
      <q-input
        v-model="province"
        outlined
        :label="$t('image')"
        :error="!!provinceError"
        :error-message="provinceError"
        :disable="currentDataLoading"
      />
      <q-input
        v-model="city"
        outlined
        :label="$t('province')"
        :error="!!cityError"
        :error-message="cityError"
        :disable="currentDataLoading"
      />
      <q-input
        v-model="lat"
        outlined
        :label="$t('city')"
        :error="!!latError"
        :error-message="latError"
        :disable="currentDataLoading"
      />
      <app-button
        :dense="false"
        type="submit"
        :label="$t('submit')"
        :disable="loading"
      />
    </q-form>
  </div>
</template>
<script setup lang="ts">
import AppButton from 'components/AppButton.vue';

import { useField, useForm } from 'vee-validate';
import { onMounted, watch } from 'vue';
import { GenderEnum } from 'src/types';
import {
  useProfile,
  useUpdateProfile,
} from 'src/composables/profile/useProfile';
import { useCreateProfileSchema } from 'src/composables/profile/profile.validate';

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: useCreateProfileSchema(),
});
const {
  request: fetchCurrentData,
  loading: currentDataLoading,
  data,
} = useProfile();
onMounted(() => {
  fetchCurrentData();
});
watch(data, (newValue) => {
  if (newValue && Object.keys(newValue).length) {
    setFieldValue('sex', newValue.sex);
    setFieldValue('birthday', newValue.birthday);
    setFieldValue('province', newValue.province);
    setFieldValue('city', newValue.city);
  }
});
const { request, loading } = useUpdateProfile();

const { value: sex, errorMessage: sexError } = useField<GenderEnum>('sex');
const { value: birthday, errorMessage: birthdayError } =
  useField<string>('birthday');
const { value: province, errorMessage: provinceError } =
  useField<number>('province');
const { value: city, errorMessage: cityError } = useField<number>('city');
const { value: currentLat, errorMessage: currentLatError } =
  useField<number>('currentLat');
const { value: currentLng, errorMessage: currentLngError } =
  useField<number>('currentLng');

const onSubmit = handleSubmit(async (values) => {
  request(values);
});
</script>
