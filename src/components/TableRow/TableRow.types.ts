import { IRow } from '../../redux/api.types';

export interface TableRowProps {
  row: IRow;
  properties: string[];
  editedRowId?: number | string;
  setEditedRowId: React.Dispatch<React.SetStateAction<number | string | undefined>>;
  rowData?: Partial<IRow>;
  setRowData: React.Dispatch<React.SetStateAction<Partial<IRow>>>;
  marginLeft: number;
  handleAdd: (evt: React.KeyboardEvent<HTMLInputElement>, parentId: number | null) => void;
  handleRowChange: (evt: React.ChangeEvent<HTMLInputElement>, prop: string) => void;
}
