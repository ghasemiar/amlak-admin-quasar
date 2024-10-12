<template>
  <q-form @submit="onSubmit" class="tw-m-4">
    <div class="tw-grid md:tw-grid-cols-3 tw-gap-3">
      <q-select
        v-model="type"
        :options="advertiseTypeOption"
        emit-value
        :label="$t('advertise_type')"
        outlined
        dense
        :error="!!typeError"
        :error-message="typeError"
      />
      <q-select
        v-model="location"
        :options="locationData"
        option-:label="name"
        option-value="id"
        emit-value
        :loading="locationLoading"
        :label="$t('location')"
        outlined
        dense
        :error="!!locationError"
        :error-message="locationError"
      />
      <q-select
        v-model="house_type"
        :options="houseTypeOption"
        emit-value
        :label="$t('house_type')"
        outlined
        dense
        :error="!!houseTypeError"
        :error-message="houseTypeError"
      />
      <q-select
        :options="heatingTypeOption"
        emit-value
        v-model="heating"
        :label="$t('heating')"
        outlined
        dense
        :error="!!heatingError"
        :error-message="heatingError"
      />
      <q-select
        :options="coolingTypeOption"
        emit-value
        v-model="cooling"
        :label="$t('cooling')"
        outlined
        dense
        :error="!!coolingError"
        :error-message="coolingError"
      />
    </div>
    <div class="tw-grid tw-grid-cols-2 tw-gap-3 tw-max-w-64">
      <q-btn :label="$t('filter')" type="submit" color="teal" />
      <q-btn :label="$t('reset')" color="teal" @click="request" />
    </div>
  </q-form>
</template>
<script setup lang="ts">
import {
  advertiseTypeOption,
  coolingTypeOption,
  heatingTypeOption,
  houseTypeOption,
} from 'src/composables/options/advertise.options';
import { useField, useForm } from 'vee-validate';
import { AdvertiseType, CoolingType, HeatingType, HouseType } from 'src/types';
import { getAllLocation } from 'src/composables/Location/useLocation';

interface AdvertiseSearchProps {
  request: (params: any) => void;
}
const props = defineProps<AdvertiseSearchProps>();

const { handleSubmit } = useForm();

const { value: heating, errorMessage: heatingError } =
  useField<HeatingType>('heating');
const { value: cooling, errorMessage: coolingError } =
  useField<CoolingType>('cooling');
const { value: location, errorMessage: locationError } =
  useField<number>('location');
const { value: house_type, errorMessage: houseTypeError } =
  useField<HouseType>('house_type');
const { value: type, errorMessage: typeError } =
  useField<AdvertiseType>('type');

const {
  loading: locationLoading,
  data: locationData,
  request: locationRequest,
} = getAllLocation();
locationRequest();

const onSubmit = handleSubmit((values) => {
  props.request(values);
});
</script>
