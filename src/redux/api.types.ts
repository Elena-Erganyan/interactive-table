export interface IRow {
  id: number;
  rowName: string;
  total: number;
  salary: number;
  mimExploitation: number;
  machineOperatorSalary: number;
  materials: number;
  mainCosts: number;
  supportCosts: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  child: IRow[];
}

export interface RecalculatedRowsResponse {
  current: Omit<IRow, 'child'>;
  changed: Omit<IRow, 'child'>[];
}

export interface ModifyRowRequest {
  rID: number;
  data: Partial<Omit<IRow, 'child' | 'id'>>;
}
