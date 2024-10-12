import { ColumnI } from 'src/types';

export const createColumn = (columnsData: string[], t: any) => {
  const columns: ColumnI[] = columnsData.map((col: string) => ({
    name: col,
    label: t(col),
    align: 'center',
    field: col,
    sortable: col != 'action',
  }));
  return columns;
};
