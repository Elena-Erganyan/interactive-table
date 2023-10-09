import { TableRowProps } from './TableRow.types';
import { useAddRowMutation, useDeleteRowMutation, useModifyRowMutation } from '../../redux/api';
import { IconButton } from '../IconButton';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { IRow } from '../../redux/api.types';
import './TableRow.style.scss';
import doc from '../../assets/document.svg';
import trash from '../../assets/trash.svg';
import { emptyRow } from '../../config';

export function TableRow ({
  row,
  properties,
  editedRowId,
  setEditedRowId,
  rowData,
  setRowData,
  marginLeft,
  handleAdd,
  handleRowChange,
}: TableRowProps
) {

  const [, { error: rowAdditionError }] = useAddRowMutation();
  const [modifyRow, { error: rowModifyingError }] = useModifyRowMutation();
  const [deleteRow, { error: rowDeletingError }] = useDeleteRowMutation();

  const handleCreateBtnClick = (rowId: number) => {
    setEditedRowId(`${rowId}_add`);
    setRowData(emptyRow);
  };

  const handleDeleteBtnClick = (rowId: number) => {
    setEditedRowId('');
    setRowData(emptyRow);
    deleteRow(rowId);
  };

  const handleRowDoubleClick = (row: IRow) => {
    setEditedRowId(row.id);
    setRowData(row);
  };

  const handleEdit = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      for (const prop of properties) {
        if (row[prop as keyof typeof row] !== rowData![prop as keyof typeof rowData]) {
          const rID = rowData?.id as number;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const {id, child, ...data} = rowData as IRow;
          modifyRow({rID, data}); // modifying the row only if some data has changed
          break;
        }
      }

      setEditedRowId('');
      setRowData(emptyRow);
    }
  };

  return rowAdditionError || rowModifyingError || rowDeletingError 
    ? <p className="error">{getErrorMessage(rowAdditionError || rowModifyingError || rowDeletingError)}</p>
    :(
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
                      name={prop}
                      value={rowData![prop as keyof typeof rowData]}
                      onChange={(evt) => handleRowChange(evt, prop)}
                      onKeyDown={handleEdit}
                      required
                      {...typeof row[prop as keyof typeof row] === 'number' && {min: 0, step: 1}}
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
              marginLeft={18 + marginLeft}
              handleAdd={handleAdd}
              handleRowChange={handleRowChange}
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
                style={{marginLeft: 22 + marginLeft}}
              />
            </td>
            {properties.map((prop, i) => {
              return (
                <td key={i}>
                  <input
                    type={typeof row[prop as keyof typeof row]}
                    name={prop}
                    value={rowData![prop as keyof typeof rowData]}
                    onChange={(evt) => handleRowChange(evt, prop)}
                    onKeyDown={(evt) => handleAdd(evt, row.id)}
                    required
                    {...typeof row[prop as keyof typeof row] === 'number' && {min: 0, step: 1}}
                  />
                </td>
              )
            })}
          </tr>
        }
      </>
    );
}
