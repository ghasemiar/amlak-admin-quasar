<template>
  <div v-if="loading"></div>
  <div v-else>
    <div class="tw-grid tw-grid-cols-4 tw-gap-3">
      <app-table
        v-if="columns.length > 0 && [data].length > 0"
        :rows="[data]"
        :columns="columns"
        :grid="true"
      />
      <div v-if="adData" class="tw-col-span-3">
        <h2 class="tw-text-lg">آگهی های پیدا شده</h2>
        <div class="tw-grid tw-grid-cols-3 tw-gap-3">
          <router-link
            v-for="(item, index) in adData"
            :key="index"
            :to="{ name: 'advertise-id', params: { id: item.id } }"
            ><q-card class="tw-rounded-lg tw-shadow-md">
              <q-img v-if="item.image" :src="getImageUrl(item.image)">
                <div style="background: none" class="absolute-bottom text-h6">
                  <span class="tw-bg-white tw-text-black tw-p-2 tw-rounded-lg"
                    >{{ item.price }} تومان</span
                  >
                </div>
              </q-img>
              <q-img v-else src="~/assets/no-photo.webp">
                <div style="background: none" class="absolute-bottom text-h6">
                  <span class="tw-bg-white tw-text-black tw-p-2 tw-rounded-lg"
                    >{{ item.price }} تومان</span
                  >
                </div>
              </q-img>

              <q-card-section>
                <div class="text-h6">{{ item.title }}</div>
                <div class="tw-text-gray-500 tw-text-[14px]">
                  {{ item.location.name }}
                </div>
                <div class="tw-text-gray-400">
                  {{ item.address }}
                </div>
              </q-card-section>
            </q-card></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useUserRequestAdvertise } from 'src/composables/userRequestAdvertise/useUserRequestAdvertise';
import AppTable from 'components/AppTable.vue';
import { getAllAdvertise } from 'src/composables/advertise/useAdvertise';
import { getImageUrl } from 'src/helper/generateImageUrl';

const { request, loading, data, columns } = useUserRequestAdvertise();
const {
  loading: adLoading,
  data: adData,
  request: adRequest,
} = getAllAdvertise();
onMounted(() => {
  request();
});
watch(data, ({ id, ...newValue }) => {
  // Send the modified newValue without the id property
  adRequest(newValue);
});
</script>
