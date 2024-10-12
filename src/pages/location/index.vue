<template>
  <div class="tw-m-2">
    <div
      v-if="loading"
      class="tw-flex tw-items-center tw-justify-center tw-h-screen"
    >
      <q-spinner-grid color="teal" size="4em" />
    </div>
    <div v-else>
      <app-button-create :to="{ name: 'location-create' }" />
      <app-table
        v-if="columns.length > 0 && data.length > 0"
        :rows="data"
        :columns="columns"
      >
        <template #actions="row">
          <q-btn
            text-color="red"
            flat
            icon="delete"
            label="حذف"
            @click="confirmDelete(deleteRequest, row.id, request)"
            :disable="deleting"
          />
          <q-btn
            text-color="teal"
            flat
            icon="create"
            label="ویرایش"
            :to="{ name: 'location-update-id', params: { id: row.id } }"
          />
        </template>
        <template v-slot:multipleDelete="{ selected }">
          <div>
            <q-btn
              class="tw-my-4"
              color="red"
              fill
              icon="delete"
              :label="$t('delete selected')"
              :disable="multipleDeleteLoading"
              @click="confirmDelete(multipleDeleteRequest, selected, request)"
            />
          </div>
        </template>
      </app-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AppTable from 'components/AppTable.vue';
import AppButtonCreate from 'components/AppButtonCreate.vue';
import { dialogs } from 'src/helper/confim.delete.dialog';
import {
  getAllLocation,
  useDeleteLocation,
  useMultipleDeleteLocation,
} from 'src/composables/Location/useLocation';

const { columns, request, data, loading } = getAllLocation();
const { request: deleteRequest, loading: deleting } = useDeleteLocation();
const { loading: multipleDeleteLoading, request: multipleDeleteRequest } =
  useMultipleDeleteLocation();
onMounted(() => {
  request();
});
const { confirmDelete } = dialogs();
</script>
