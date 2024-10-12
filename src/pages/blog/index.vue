<template>
  <div class="tw-m-2">
    <div
      v-if="loading"
      class="tw-flex tw-items-center tw-justify-center tw-h-screen"
    >
      <q-spinner-grid color="teal" size="4em" />
    </div>
    <div v-else>
      <app-button-create :to="{ name: 'blog-create' }" />
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
            :to="{ name: 'blog-update-id', params: { id: row.id } }"
          />
        </template>
      </app-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePostList, useDeletePost } from 'src/composables/blog/usePost';
import AppTable from 'components/AppTable.vue';
import AppButtonCreate from 'components/AppButtonCreate.vue';
import { onMounted } from 'vue';
import { dialogs } from 'src/helper/confim.delete.dialog';

const { loading, request, data, columns } = usePostList();
const { request: deleteRequest, loading: deleting } = useDeletePost();
onMounted(() => {
  request();
});
const { confirmDelete } = dialogs();
</script>
