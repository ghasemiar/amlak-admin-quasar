<template>
  <q-page class="tw-m-2">
    <q-tabs
      v-model="tab"
      active-color="teal"
      indicator-color="teal"
      align="left"
      narrow-indicator
    >
      <q-tab name="land" label="مشخصات زمین " />
      <q-tab
        name="house"
        label="مشخصات های خانه"
        :disable="type != AdvertiseType.HOUSE"
      />
    </q-tabs>
    <q-form @submit="onSubmit" class="tw-m-4">
      <q-tab-panels class="tw-bg-none" v-model="tab" animated>
        <q-tab-panel name="land">
          <div class="tw-col-span-2 tw-grid tw-grid-cols-2 tw-gap-5">
            <!-- Title -->
            <q-input
              v-model="title"
              :label="$t('title')"
              filled
              :error="!!titleError"
              :error-message="titleError"
            />
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
            <!-- Description -->
            <q-input
              v-model="description"
              :label="$t('description')"
              filled
              type="textarea"
              :error="!!descriptionError"
              :error-message="descriptionError"
            />
            <!-- Address -->
            <q-input
              v-model="address"
              :label="$t('address')"
              filled
              :error="!!addressError"
              :error-message="addressError"
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
            <!-- Latitude -->
            <q-input
              v-model="lat"
              :label="$t('lat')"
              filled
              type="number"
              :error="!!latError"
              :error-message="latError"
            />
            <!-- Longitude -->
            <q-input
              v-model="lng"
              :label="$t('lng')"
              filled
              type="number"
              :error="!!lngError"
              :error-message="lngError"
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
            <!-- Image -->
            <q-file
              v-model="image"
              :label="$t('image')"
              filled
              :error="!!imageError"
              :error-message="imageError"
              accept="image/*"
            />
            <q-file
              v-model="gallery"
              :label="$t('gallery')"
              filled
              :error="!!galleryError"
              :error-message="galleryError"
              multiple
              accept="image/*"
            />
          </div>
        </q-tab-panel>
        <q-tab-panel name="house">
          <div
            v-if="
              type == AdvertiseType.HOUSE ||
              (type && type != AdvertiseType.LAND)
            "
            class="tw-col-span-2 tw-grid tw-grid-cols-2 tw-gap-5"
          >
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
          </div>
        </q-tab-panel>
      </q-tab-panels>
      <!-- Submit Button -->
      <q-btn
        :loading="loading"
        type="submit"
        class="tw-px-5"
        :label="
          tab == 'land' && type === AdvertiseType.HOUSE
            ? $t('continue')
            : $t('submit')
        "
        color="teal"
      />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { AdvertiseType, CoolingType, HeatingType, HouseType } from 'src/types';
import { AdvertiseFormDto } from 'src/composables/advertise/advertiseForm.dto';
import { advertiseCategorySchema } from 'src/composables/advertise/advertise.validate';
import {
  advertiseTypeOption,
  coolingTypeOption,
  heatingTypeOption,
  houseTypeOption,
} from 'src/composables/options/advertise.options';
import { getAllLocation } from 'src/composables/Location/useLocation';
import { useCreateAdvertise } from 'src/composables/advertise/useAdvertise';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
const { t } = useI18n();
const tab = ref('land');

const {
  loading: locationLoading,
  data: locationData,
  request: locationRequest,
} = getAllLocation();
locationRequest();
//define create advertise function
const { request, loading } = useCreateAdvertise();
//handel form with vee-validate
const { handleSubmit } = useForm<AdvertiseFormDto>({
  validationSchema: advertiseCategorySchema(t),
});
const { value: title, errorMessage: titleError } = useField<string>('title');
const { value: type, errorMessage: typeError } =
  useField<AdvertiseType>('type');
const { value: description, errorMessage: descriptionError } =
  useField<string>('description');
const { value: address, errorMessage: addressError } =
  useField<string>('address');
const { value: price, errorMessage: priceError } = useField<number>('price');
const { value: area, errorMessage: areaError } = useField<number>('area');
const { value: lat, errorMessage: latError } = useField<number>('lat');
const { value: lng, errorMessage: lngError } = useField<number>('lng');
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
const { value: image, errorMessage: imageError } = useField<FileList | null>(
  'image'
);
const { value: gallery, errorMessage: galleryError } =
  useField<FileList | null>('gallery');
//submit function
const onSubmit = handleSubmit((values) => {
  if (tab.value == 'land' && values.type === AdvertiseType.HOUSE) {
    tab.value = 'house';
  } else {
    const formData = new FormData();

    // Append other form fields to the FormData object
    formData.append('title', values.title);
    formData.append('type', values.type);
    formData.append('description', values.description);
    formData.append('address', values.address);
    formData.append('price', values.price.toString());
    formData.append('area', values.area.toString());
    formData.append('lat', values.lat.toString());
    formData.append('lng', values.lng.toString());
    formData.append('location', values.location.toString());
    if (values.image && values.image.length > 0) {
      formData.append('image', values.image[0]);
    }

    // Handle the gallery field (multiple files)
    if (values.gallery && values.gallery.length > 0) {
      values.gallery.forEach((file) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        formData.append('gallery', file);
      });
    }
    values.house_type ? formData.append('house_type', values.house_type) : null;
    values.room_count
      ? formData.append('room_count', values.room_count.toString())
      : null;
    values.building_age
      ? formData.append('building_age', values.building_age.toString())
      : null;
    values.heating ? formData.append('heating', values.heating) : null;
    values.cooling ? formData.append('cooling', values.cooling) : null;
    values.car_park_count
      ? formData.append('car_park_count', values.car_park_count.toString())
      : null;

    request(formData);
  }
});
</script>
