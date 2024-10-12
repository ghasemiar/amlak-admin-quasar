<template>
  <q-page class="tw-m-2">
    <q-form @submit="onSubmit" class="tw-m-4">
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
      <!-- Price -->
      <q-input
        v-model="price"
        :label="$t('price')"
        filled
        type="number"
        :error="!!priceError"
        :error-message="priceError"
      />
      <!-- Area -->
      <q-input
        v-model="area"
        :label="$t('area')"
        filled
        type="number"
        :error="!!areaError"
        :error-message="areaError"
      />

      <!-- Location -->
      <q-select
        v-model="location"
        :options="locationData"
        option-:label="name"
        option-value="id"
        emit-value
        :loading="locationLoading"
        :label="$t('location')"
        filled
        :error="!!locationError"
        :error-message="locationError"
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
import {
  useCreateUserRequestAdvertise,
  useUpdateUserRequestAdvertise,
  useUserRequestAdvertise,
} from 'src/composables/userRequestAdvertise/useUserRequestAdvertise';
import { UserRequestAdvertiseFormDto } from 'src/composables/userRequestAdvertise/userRequestAdvertiseForm.dto';
import { onMounted, watch } from 'vue';

const {
  loading: locationLoading,
  data: locationData,
  request: locationRequest,
} = getAllLocation();

const {
  data: fetchedData,
  loading: fetching,
  request: fetch,
} = useUserRequestAdvertise();
onMounted(() => {
  locationRequest();
  fetch();
});

//define create advertise function
const { request, loading } = useCreateUserRequestAdvertise();

//handel form with vee-validate
const { handleSubmit, setFieldValue } = useForm<UserRequestAdvertiseFormDto>({
  validationSchema: useCreateUserRequestAdvertiseSchema(),
});

watch(fetchedData, (newValue) => {
  if (newValue) {
    setFieldValue('type', newValue.type);
    setFieldValue('price', newValue.price);
    setFieldValue('area', newValue.area);
    setFieldValue('location', newValue.location.id);
    if (newValue.type == AdvertiseType.HOUSE) {
      setFieldValue('building_age', newValue?.building_age);
      setFieldValue('car_park_count', newValue?.car_park_count);
      setFieldValue('room_count', newValue?.room_count);
      setFieldValue('cooling', newValue?.cooling);
      setFieldValue('heating', newValue?.heating);
      setFieldValue('house_type', newValue?.house_type);
    }
  }
});

const { value: type, errorMessage: typeError } =
  useField<AdvertiseType>('type');
const { value: price, errorMessage: priceError } = useField<number>('price');
const { value: area, errorMessage: areaError } = useField<number>('area');
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

//submit function
const onSubmit = handleSubmit((values) => {
  request(values);
});
</script>
