<template>
  <div class="tw-m-2">
    <div
      v-if="loading"
      class="tw-flex tw-items-center tw-justify-center tw-h-[80vh]"
    >
      <q-spinner-grid color="teal" size="4em" />
    </div>
    <div v-else>
      <q-btn
        color="teal"
        fill
        class="tw-my-4"
        icon="upload"
        :label="$t('upload')"
        :to="{ name: 'image-create' }"
      />
      <div class="tw-grid tw-grid-cols-4 tw-gap-3">
        <q-card
          v-for="(image, index) in data"
          :key="index"
          class="my-card"
          flat
          bordered
        >
          <q-responsive :ratio="1" class="col">
            <q-img :src="getImageUrl(image.url)" :alt="image.alt" />
          </q-responsive>
          <q-card-section>اسم فایل : {{image.name}}</q-card-section>
          <q-card-actions align="right">
            <q-btn
              text-color="red"
              flat
              icon="delete"
              label="حذف"
              @click="confirmDelete(deleteRequest, image.id, request)"
              :disable="deleting"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDeleteImage, useImageList } from 'src/composables/image/useImage';
import { onMounted } from 'vue';
import { dialogs } from 'src/helper/confim.delete.dialog';
import { getImageUrl } from 'src/helper/generateImageUrl';
const { confirmDelete } = dialogs();
const { loading, data, request } = useImageList();
const { request: deleteRequest, loading: deleting } = useDeleteImage();
onMounted(() => {
  request();
});
</script>
