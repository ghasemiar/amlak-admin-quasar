import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

export const dialogs = () => {
  const $q = useQuasar();
  const { t } = useI18n();
  const confirmDelete = (method: any, id: any, afterdone: any) => {
    $q.dialog({
      title: t('confirmation'),
      message: t('Are you sure you want to delete this item?'),
      ok: {
        label: t('yes'),
        color: 'red',
      },
      cancel: {
        label: t('no'),
        color: 'green',
      },
    })
      .onOk(() => {
        method(id, afterdone);
      })
      .onCancel(() => {
        // User canceled, no action
      });
  };
  return { confirmDelete };
};
