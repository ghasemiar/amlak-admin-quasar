import { UserRole } from 'src/types';

export const userRoleOption = [
  { label: 'ادمین', value: UserRole.ADMIN },
  { label: 'کاربر', value: UserRole.GHOST },
];
export const singleSendSmsOption = [
  {label:'ساده',value:'simple'},
  {label:'زمان دار',value:'schedule'},
  {label:'با دامنه',value:'with-domain'},
  {label:'از خط خدماتی',value:'shared'},
]
