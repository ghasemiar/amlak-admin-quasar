<template>
  <div class="tw-m-2">
    <div
      v-if="loading"
      class="tw-flex tw-items-center tw-justify-center tw-h-screen"
    >
      <q-spinner-grid color="teal" size="4em" />
    </div>
    <div v-else>
      <app-table
        v-if="columns.length > 0"
        :rows="[data]"
        :grid="true"
        :columns="columns"
      >
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
import {
  getAllUser,
  useDeleteUser,
  useMultipleDeleteUser, useUser
} from 'src/composables/user/useUser';
import axios from 'axios';
import { ColumnI } from 'src/types';
interface propsI{
  columns:ColumnI[],
  data:any,
  loading:boolean,
}
const props = defineProps<propsI>()
</script>
