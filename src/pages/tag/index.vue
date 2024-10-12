<template>
  <div class="tw-m-2">
    <div
      v-if="loading"
      class="tw-flex tw-items-center tw-justify-center tw-h-[80vh]"
    >
      <q-spinner-grid color="teal" size="4em" />
    </div>
    <div v-else>
      <app-button-create :to="{ name: 'tag-create' }" />
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
            :to="{ name: 'tag-update-id', params: { id: row.id } }"
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
  useDeleteTag,
  useMultipleDeleteTag,
  useTagList,
} from 'src/composables/tag/useTag';

const { columns, request, data, loading } = useTagList();
const { request: deleteRequest, loading: deleting } = useDeleteTag();
const { loading: multipleDeleteLoading, request: multipleDeleteRequest } =
  useMultipleDeleteTag();
onMounted(() => {
  request();
});
const { confirmDelete } = dialogs();
</script>
