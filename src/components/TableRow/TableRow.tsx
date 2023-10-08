import { TableRowProps } from './TableRow.types';
import { IRow } from '../../redux/api.types';
import { useAddRowMutation, useDeleteRowMutation, useModifyRowMutation } from '../../redux/api';
import './TableRow.style.scss';
import { IconButton } from '../IconButton';
import doc from '../../assets/document.svg';
import trash from '../../assets/trash.svg';

export function TableRow ({
  row,
  properties,
  editedRowId,
  setEditedRowId,
  rowData,
  setRowData,
  marginLeft,
}: TableRowProps
) {

  const [addRow,
    // { error: rowAdditionError, isLoading: isRowAdding, isSuccess: isRowAdded }
  ] = useAddRowMutation();

  const [modifyRow,
    // { error: rowModifyingError, isLoading: isRowModifying, isSuccess: isRowModified }
  ] = useModifyRowMutation();

  const [deleteRow,
    // { error: rowDeletingError, isLoading: isRowDeleting, isSuccess: isRowDeleted }
  ] = useDeleteRowMutation();

  const handleCreateBtnClick = (rowId: number) => {
    setEditedRowId(`${rowId}_add`);
    setRowData({
      rowName: '',
      total: 0,
      salary: 0, 
      mimExploitation: 0,
      machineOperatorSalary: 0,
      materials: 0,
      mainCosts: 0,
      supportCosts: 0,
      equipmentCosts: 0,
      overheads: 0,
      estimatedProfit: 0,
    });
  };

  const handleDeleteBtnClick = (rowId: number) => {
    setEditedRowId('');
    setRowData({});
    deleteRow(rowId);
  };

  const handleRowDoubleClick = (row: IRow) => {
    setEditedRowId(row.id);
    setRowData(row);
  };

  const handleRowChange = (evt: React.ChangeEvent<HTMLInputElement>, prop: string) => {
    setRowData((oldData) => ({...oldData, [prop]: evt.target.value }));
  };

  const handleEdit = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      console.log(rowData);
      const rID = rowData?.id as number;
      delete rowData!['child'];
      delete rowData!['id'];
      modifyRow({rID, data: rowData as Omit<IRow, 'child' | 'id'>});
      setEditedRowId('');
      setRowData({});
    }
  }

  const handleAdd = (evt: React.KeyboardEvent<HTMLInputElement>, parentId: number) => {
    if (evt.key === 'Enter') {
      const data = {...rowData, parentId};
      setEditedRowId('');
      setRowData({});
      addRow(data as Omit<IRow, 'child' | 'id'>);
    }
  }

  return (
    <>
      <tr key={row.id} onDoubleClick={() => handleRowDoubleClick(row)}>
        <td className="table__data table__data--level">
          <div style={{marginLeft: `${marginLeft}px`}} className="table__buttons">
            <IconButton
              title="Add"
              className="table__add-row"
              handleClick={() => handleCreateBtnClick(row.id)}
              image={doc}
              disabled={editedRowId === row.id}
            />
            <IconButton
              title="Delete"
              className="table__delete-row"
              handleClick={() => handleDeleteBtnClick(row.id)}
              image={trash}
              disabled={editedRowId === row.id}
              {...editedRowId === row.id && {style: {display: 'none'}}}
            />
          </div>
        </td>
        {properties.map((prop, i) => {
          return (
            <td key={i}>
              {editedRowId === row.id
                ? <input
                    type={typeof row[prop as keyof typeof row]}
                    min={0}
                    step={1}
                    name={prop}
                    value={rowData![prop as keyof typeof rowData]}
                    onChange={(evt) => handleRowChange(evt, prop)}
                    onKeyDown={handleEdit}
                    required
                  />
                : <>{row[prop as keyof typeof row]}</>
              }
            </td>
          )
        })}
      </tr>
      {row.child && 
        row.child.map((childRow) => 
          (<TableRow
            key={childRow.id}
            row={childRow}
            properties={properties}
            editedRowId={editedRowId}
            setEditedRowId={setEditedRowId}
            rowData={rowData}
            setRowData={setRowData}
            marginLeft={24 + marginLeft}
          />)
      )}
      {editedRowId === row.id + '_add' &&
        <tr>
          <td>
            <IconButton
              title="Add"
              className="table__add-row"
              handleClick={() => handleCreateBtnClick(row.id)}
              image={doc}
              disabled={editedRowId === row.id + '_add'}
              style={{marginLeft: 27 + marginLeft}}
            />
          </td>
          {properties.map((prop, i) => {
            return (
              <td key={i}>
                <input
                  type={typeof row[prop as keyof typeof row]}
                  min={0}
                  step={1}
                  name={prop}
                  value={rowData![prop as keyof typeof rowData]}
                  onChange={(evt) => handleRowChange(evt, prop)}
                  onKeyDown={(evt) => handleAdd(evt, row.id, )}
                  required
                />
              </td>
            )
          })}
        </tr>
      }
    </>
  );
}