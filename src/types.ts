export interface ColumnI {
  name: string;
  label: string;
  align: string;
  field: string;
  sortable: boolean;
}
export enum AdvertiseType {
  HOUSE = 'house',
  LAND = 'land',
}
export enum HouseType {
  DUPLEX = 'duplex', //دوبلکس
  TRIPLEX = 'triplex', //تریپلکس
  VILLA = 'villa', //یک طبقه
}
export enum CoolingType {
  WATER_CO0LER = 'water_cooler', //کولر ابی
  AIR_CONDITIONER = 'air_conditioner', //کولر گازی
  FAN_COIL = 'fan_coil', //فن کویل
}
export enum HeatingType {
  STOVE = 'stove', //بخاری
  HEATER = 'heater', //شوفاژ
  FLOOR_HEATING = 'floor_heating', //از کف
}
export enum UserRole {
  ADMIN = 'admin',
  GHOST = 'ghost',
}
export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
