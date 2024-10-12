<template>
  <div class="tw-my-2 md:tw-my-4">
    <q-table
      flat
      bordered
      table-header-class="theader"
      :rows="rows"
      :columns="columns"
      row-key="id"
      selection="multiple"
      color="teal"
      :hide-pagination="grid"
      :pagination="{
        rowsPerPage: 15,
      }"
      :grid="$q.platform.is.mobile || grid"
      v-model:selected="selectedRows"
      @update:selected="updateSelected"
    >
      <template v-slot:body-cell="props">
        <q-td :props="props" @mouseover="hoveredRow = props.row.id" @mouseout="hoveredRow = null">
          {{
            typeof props.value == 'string' ? $t(props.value) : typeof props.value == 'boolean' ? $t(props.value.toString()) : props.value
          }}
        </q-td>
      </template>
      <template v-slot:item="props">
        <div
          class="q-table__grid-item tw-grid tw-border tw-bg-surface-light bor tw-border tw-m-2 tw-p-8 tw-rounded-xl"
        >
          <div class="tw-grid tw-gap-5">
            <div
              v-for="col in props.cols.filter((col) => col.name !== 'desc')"
              :key="col.name"
            >
              {{ col.label }} : {{ col.value }}
            </div>
          </div>

          <div
            v-if="$slots.actions"
            class="tw-w-full tw-flex tw-justify-center"
          >
            <slot
              name="actions"
              v-bind="props.row"
              :row="props.row"
              :hovered="hoveredRow"
              :rowIndex="props.rowIndex"
            ></slot>
          </div>
        </div>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td v-if="$slots.actions" style="text-align: end">
          <slot
            name="actions"
            v-bind="props.row"
            :row="props.row"
            :hovered="hoveredRow"
            :rowIndex="props.rowIndex"
          ></slot>
        </q-td>
      </template>
    </q-table>
    <div v-if="$slots.multipleDelete">
      <slot name="multipleDelete" :selected="selected"></slot>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    grid: {
      type: Boolean,
      required: false,
      nullable: true,
      default: false,
    },
  },
  emits: ['update:selectedRows'], // Define the event
  setup(props, { emit }) {
    const selectedRows = ref([]); // Holds the selected row objects
    const selected = ref([]); // Holds the array of selected IDs
    const $q = useQuasar();
    const hoveredRow = ref()
    // Updates the selected IDs whenever the selection changes
    const updateSelected = (rows) => {
      selected.value = rows.map((row) => row); // Map the selected rows to their IDs
      emit('update:selectedRows', selected.value); // Emit the selected IDs
    };

    return {
      $q,
      selectedRows,
      selected,
      updateSelected,
      hoveredRow
    };
  },
};
</script>
