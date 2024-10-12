<template>
  <div class="tw-m-10">
    <q-form @submit="onSubmit" class="tw-grid tw-gap-5">
      <q-input
        v-model="title"
        filled
        :label="$t('title')"
        :loading="currentDataLoading"
        :disable="loading"
        :error="!!titleError"
        :error-message="titleError"
      />
      <div class="tw-m-2">
        <div
          v-if="userLoading"
          class="tw-flex tw-items-center tw-justify-center tw-h-[80vh]"
        >
          <q-spinner-grid color="teal" size="4em" />
        </div>
        <div v-else>
          <app-table
            v-if="columns.length > 0 && userData.length > 0"
            :rows="userData"
            :columns="columns"
            @update:selected-rows="handleSelectedRows"
          >
          </app-table>
        </div>
      </div>
      <q-btn type="submit" :label="$t('submit')" color="teal" />
    </q-form>
  </div>
</template>
<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { useCreateUserGroupSchema } from 'src/composables/userGroup/userGroup.validate';
import { useCreateUserGroup, useUserGroup } from 'src/composables/userGroup/useUserGroup';
import { getAllUser } from 'src/composables/user/useUser';
import { onMounted, watch } from 'vue';
import AppTable from 'components/AppTable.vue';

const { handleSubmit,setFieldValue } = useForm({
  validationSchema: useCreateUserGroupSchema(),
});
const {data:userData,loading:userLoading,request:userRequest,columns} = getAllUser()
const {request: fetchCurrentData,
  loading: currentDataLoading,
  data} = useUserGroup()
onMounted(()=>{
  userRequest()
  fetchCurrentData()
})
watch(data, (newValue) => {
  if (newValue && Object.keys(newValue).length) {
    setFieldValue('title', newValue.title);
  }
});
const handleSelectedRows = (selectedIds:number[]) => {
  user.value = selectedIds;
}
const { request, loading } = useCreateUserGroup();
const { value: title, errorMessage: titleError } = useField<string>('title');
const { value: user, errorMessage: userError } = useField<Array<number>>('user');
const onSubmit = handleSubmit(async (values) => {
request(values)});
</script>
