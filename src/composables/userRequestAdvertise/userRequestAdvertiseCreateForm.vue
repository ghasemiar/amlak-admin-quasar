<template>
  <q-page class="tw-m-2">
    <q-form @submit="onSubmit" class="tw-m-4 tw-grid tw-grid-cols-2 tw-gap-3">
      <!-- Type -->
      <q-select
        v-model="type"
        :options="advertiseTypeOption"
        emit-value
        :label="$t('advertise_type')"
        filled
        :error="!!typeError"
        :error-message="typeError"
      />
      <!-- Location -->
      <q-select
        v-model="location"
        :options="locationData"
        option-label="name"
        option-value="id"
        emit-value
        :loading="locationLoading"
        :label="$t('location')"
        filled
        :error="!!locationError"
        :error-message="locationError"
      />
      <!-- User -->
      <q-select
        v-model="user"
        :options="userData"
        option-label="username"
        option-value="id"
        emit-value
        :loading="userLoading"
        :label="$t('user')"
        filled
        :error="!!userError"
        :error-message="userError"
      />
      <!-- Min Price -->
      <q-input
        v-model="min_price"
        :label="$t('min price')"
        filled
        type="number"
        :error="!!min_priceError"
        :error-message="min_priceError"
      />
      <!-- Max Price -->
      <q-input
        v-model="max_price"
        :label="$t('max price')"
        filled
        type="number"
        :error="!!max_priceError"
        :error-message="max_priceError"
      />
      <!-- Min Area -->
      <q-input
        v-model="min_area"
        :label="$t('min area')"
        filled
        type="number"
        :error="!!min_areaError"
        :error-message="min_areaError"
      />
      <!-- Max Area -->
      <q-input
        v-model="max_area"
        :label="$t('max area')"
        filled
        type="number"
        :error="!!max_areaError"
        :error-message="max_areaError"
      />
      <!-- House Type -->
      <q-select
        v-model="house_type"
        :options="houseTypeOption"
        emit-value
        :label="$t('house_type')"
        filled
        :error="!!houseTypeError"
        :error-message="houseTypeError"
      />
      <!-- Room Count -->
      <q-input
        v-model="room_count"
        :label="$t('room_count')"
        filled
        type="number"
        :error="!!roomCountError"
        :error-message="roomCountError"
      />
      <!-- Building Age -->
      <q-input
        v-model="building_age"
        :label="$t('building_age')"
        filled
        type="number"
        :error="!!buildingAgeError"
        :error-message="buildingAgeError"
      />
      <!-- Heating -->
      <q-select
        :options="heatingTypeOption"
        emit-value
        v-model="heating"
        :label="$t('heating')"
        filled
        :error="!!heatingError"
        :error-message="heatingError"
      />
      <!-- Cooling -->
      <q-select
        :options="coolingTypeOption"
        emit-value
        v-model="cooling"
        :label="$t('cooling')"
        filled
        :error="!!coolingError"
        :error-message="coolingError"
      />
      <!-- Car Park Count -->
      <q-input
        v-model="car_park_count"
        :label="$t('car_park_count')"
        filled
        type="number"
        :error="!!carParkCountError"
        :error-message="carParkCountError"
      />
      <!-- Submit Button -->
      <q-btn
        :loading="loading"
        type="submit"
        class="tw-px-5"
        :label="$t('submit')"
        color="teal"
      />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { AdvertiseType, CoolingType, HeatingType, HouseType } from 'src/types';
import {
  advertiseTypeOption,
  coolingTypeOption,
  heatingTypeOption,
  houseTypeOption,
} from 'src/composables/options/advertise.options';
import { getAllLocation } from 'src/composables/Location/useLocation';
import { useCreateUserRequestAdvertiseSchema } from 'src/composables/userRequestAdvertise/userRequestAdvertise.validate';
import { useCreateUserRequestAdvertise } from 'src/composables/userRequestAdvertise/useUserRequestAdvertise';
import { UserRequestAdvertiseFormDto } from 'src/composables/userRequestAdvertise/userRequestAdvertiseForm.dto';
import { getAllUser } from 'src/composables/user/useUser';

const {
  loading: locationLoading,
  data: locationData,
  request: locationRequest,
} = getAllLocation();
locationRequest();

const {
  loading: userLoading,
  data: userData,
  request: userRequest,
} = getAllUser();
userRequest();
//define create advertise function
const { request, loading } = useCreateUserRequestAdvertise();

//handel form with vee-validate
const { handleSubmit } = useForm<UserRequestAdvertiseFormDto>({
  validationSchema: useCreateUserRequestAdvertiseSchema(),
});

const { value: type, errorMessage: typeError } =
  useField<AdvertiseType>('type');
const { value: min_price, errorMessage: min_priceError } =
  useField<number>('min_price');
const { value: max_price, errorMessage: max_priceError } =
  useField<number>('max_price');
const { value: min_area, errorMessage: min_areaError } =
  useField<number>('min_area');
const { value: max_area, errorMessage: max_areaError } =
  useField<number>('max_area');
const { value: location, errorMessage: locationError } =
  useField<number>('location');
const { value: house_type, errorMessage: houseTypeError } =
  useField<HouseType>('house_type');
const { value: room_count, errorMessage: roomCountError } =
  useField<number>('room_count');
const { value: building_age, errorMessage: buildingAgeError } =
  useField<number>('building_age');
const { value: heating, errorMessage: heatingError } =
  useField<HeatingType>('heating');
const { value: cooling, errorMessage: coolingError } =
  useField<CoolingType>('cooling');
const { value: car_park_count, errorMessage: carParkCountError } =
  useField<number>('car_park_count');
const { value: user, errorMessage: userError } = useField<number>('user');

//submit function
const onSubmit = handleSubmit((values) => {
  request(values);
});
</script>
