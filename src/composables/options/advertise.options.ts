import { AdvertiseType, CoolingType, HeatingType, HouseType } from 'src/types';

export const advertiseTypeOption = [
  { label: 'زمین', value: AdvertiseType.LAND },
  { label: 'خانه', value: AdvertiseType.HOUSE },
];
export const houseTypeOption = [
  { label: 'ویلایی', value: HouseType.VILLA },
  { label: 'دوبلس', value: HouseType.DUPLEX },
  { label: 'تربلکس', value: HouseType.TRIPLEX },
];
export const heatingTypeOption = [
  { label: 'بخاری', value: HeatingType.STOVE },
  { label: 'شوفاژ', value: HeatingType.HEATER },
  { label: 'از کف', value: HeatingType.FLOOR_HEATING },
];
export const coolingTypeOption = [
  { label: 'کولر ابی', value: CoolingType.WATER_CO0LER },
  { label: 'کولر گازی', value: CoolingType.AIR_CONDITIONER },
  { label: 'فن کویل', value: CoolingType.FAN_COIL },
];
