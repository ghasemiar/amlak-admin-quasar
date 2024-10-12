<template>
  <div class="tw-m-2">
    <div
      v-if="loading"
      class="tw-flex tw-items-center tw-justify-center tw-h-[80vh]"
    >
      <q-spinner-grid color="teal" size="4em" />
    </div>
    <div v-else>
      <app-button-create :to="{ name: 'advertise-create' }" />
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
            color="teal"
            flat
            icon="create"
            label="ویرایش"
            :to="{ name: 'advertise-update-id', params: { id: row.id } }"
          />
        </template>
        <template v-slot:multipleDelete="{ selected }">
          <q-btn
            class="tw-my-4"
            color="red"
            fill
            icon="delete"
            :label="$t('delete selected')"
            :disable="multipleDeleteLoading"
            @click="confirmDelete(multipleDeleteRequest, selected, request)"
          />
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
  getAllAdvertise,
  useDeleteAdvertise,
  useMultipleDeleteAdvertise,
} from 'src/composables/advertise/useAdvertise';
import { useI18n } from 'vue-i18n';
import AdvertiseSearch from 'src/composables/advertise/advertiseSearch.vue';
import AppSearchWrapper from 'components/AppSearchWrapper.vue';
const { t } = useI18n();
const { columns, request, data, loading } = getAllAdvertise();
const { request: deleteRequest, loading: deleting } = useDeleteAdvertise();
const { loading: multipleDeleteLoading, request: multipleDeleteRequest } =
  useMultipleDeleteAdvertise();
onMounted(() => {
  request();
});
const { confirmDelete } = dialogs();
</script>
<style lang="scss">
.q-expansion-item {
  .q-focus-helper {
    visibility: hidden;
  }
}
</style>
