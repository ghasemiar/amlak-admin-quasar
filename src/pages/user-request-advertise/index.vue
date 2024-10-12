<template>
  <div class="tw-m-2">
    <div
      v-if="loading"
      class="tw-flex tw-items-center tw-justify-center tw-h-screen"
    >
      <q-spinner-grid color="teal" size="4em" />
    </div>
    <div v-else>
      <app-button-create :to="{ name: 'user-request-advertise-create' }" />
      <app-search-wrapper
        ><advertise-search :request="request"
      /></app-search-wrapper>
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
            :to="{
              name: 'user-request-advertise-update-id',
              params: { id: row.id },
            }"
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
  useDeleteUserRequestAdvertise,
  useMultipleDeleteUserRequestAdvertise,
  useUserRequestAdvertiseList,
} from 'src/composables/userRequestAdvertise/useUserRequestAdvertise';
import AppSearchWrapper from 'components/AppSearchWrapper.vue';
import AdvertiseSearch from 'src/composables/advertise/advertiseSearch.vue';
const { columns, request, data, loading } = useUserRequestAdvertiseList();
const { request: deleteRequest, loading: deleting } =
  useDeleteUserRequestAdvertise();
const { loading: multipleDeleteLoading, request: multipleDeleteRequest } =
  useMultipleDeleteUserRequestAdvertise();
onMounted(() => {
  request();
});
const { confirmDelete } = dialogs();
</script>
