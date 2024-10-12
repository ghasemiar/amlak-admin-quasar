<template>
  <div class="tw-m-10">
    <q-form @submit="onSubmit" class="tw-grid tw-gap-5">
      <q-input
        filled
        type="textarea"
        v-model="text"
        :label="$t('text')"
        :error="!!textError"
        :error-message="textError"
      />
      <q-select
        filled
        :options="userGroupData"
        option-value="id"
        option-label="title"
        :loading="userGroupLoading"
        :error="!!groupError"
        :error-message="groupError"
        :label="$t('userGroup')"
        outlined
        v-model="group"
        use-chips
        multiple
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
            v-if="userColumns.length > 0 && userData.length > 0"
            :rows="userData"
            :columns="userColumns"
            @update:selected-rows="handleSelectedRows"
          >
            <template #actions="{ row }">
              <q-btn
                text-color="red"
                flat
                icon="sms"
                :to="{
                  name: 'user-id',
                  params: { id: row.id },
                  query: { tab: 'sendSms' },
                }"
              />
            </template>
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
import {
  useCreateUserGroup,
  useUserGroupList,
} from 'src/composables/userGroup/useUserGroup';
import { UserDto } from 'src/composables/user/user.dto';
import { getAllUser } from 'src/composables/user/useUser';
import { onMounted } from 'vue';
import AppButtonCreate from 'components/AppButtonCreate.vue';
import AppTable from 'components/AppTable.vue';
import { useSendSmsAdvancedValidation } from 'src/composables/sendSms/sendSms.validate';
import { useSendSmsAdvanced } from 'src/composables/sendSms/useSendSms';
const {
  data: userData,
  loading: userLoading,
  request: userRequest,
  columns: userColumns,
} = getAllUser();
const {
  data: userGroupData,
  loading: userGroupLoading,
  request: userGroupRequest,
} = useUserGroupList();
const { loading, request } = useSendSmsAdvanced();
onMounted(() => {
  userRequest();
  userGroupRequest();
});
const handleSelectedRows = (selectedIds: number[]) => {
  user.value = selectedIds;
};
const { handleSubmit } = useForm({
  validationSchema: useSendSmsAdvancedValidation(),
});
const { value: text, errorMessage: textError } = useField<string>('text');
const { value: user, errorMessage: userError } =
  useField<Array<number>>('user');
const { value: group, errorMessage: groupError } =
  useField<Array<number>>('group');
const onSubmit = handleSubmit(async (values) => {
  request(values);
});
</script>
