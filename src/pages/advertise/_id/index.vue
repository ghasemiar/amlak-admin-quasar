<template>
  <div v-if="loading"></div>
  <div v-else class="tw-m-10">
    <h2 class="tw-text-2xl tw-font-bold">اطلاعات</h2>
    <div class="tw-grid tw-grid-cols-3 tw-gap-4">
      <div class="tw-border tw-p-5">
        <div
          class="tw-flex tw-justify-between tw-mt-2"
          v-for="(item, i) in advertiseInfoColumn"
          :key="i"
        >
          <div>{{ $t(item) }} :</div>
          <div>
            {{ typeof data[item] == 'string' ? $t(data[item]) : data[item] }}
          </div>
        </div>
      </div>
      <div class="tw-col-span-2 tw-border tw-p-5">
        <div class="tw-mt-2 tw-grid tw-gap-5">
          <div class="tw-text-lg tw-font-bold">توضیحات</div>
          <div>{{ data.description }}</div>
          <div class="tw-text-lg tw-font-bold">آدرس</div>
          <div>{{ data.address }}</div>
        </div>
      </div>
      <div v-if="data.advertising_attr">
        <div class="tw-border tw-p-5">
          <div
            class="tw-flex tw-justify-between tw-mt-2"
            v-for="(item, i) in advertiseHouseInfoColumn"
            :key="i"
          >
            <div>{{ $t(item) }} :</div>
            <div>{{ $t(data.advertising_attr[item]) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAdvertise } from 'src/composables/advertise/useAdvertise';
import {
  advertiseInfoColumn,
  advertiseHouseInfoColumn,
} from 'src/composables/advertise/advertise.validate';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const { request, loading, data } = getAdvertise();
onMounted(() => {
  request();
});
</script>
