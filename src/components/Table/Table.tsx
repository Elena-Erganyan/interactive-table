import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAddRowMutation, useGetRowListQuery } from '../../redux/api';
import { TableRow } from '../TableRow';
import { IRow } from '../../redux/api.types';
import { TableProps } from './Table.types';
import { IconButton } from '../IconButton';
import './Table.style.scss';
import doc from '../../assets/document.svg';
import { getErrorMessage } from '../../utils/getErrorMessage';

export function Table ({tableData}: TableProps) {
  const { title, headProperties, properties, props } = tableData;

  const [editedRowId, setEditedRowId] = useState<number | string>();
  const [rowData, setRowData] = useState<Partial<IRow>>();

  const {
    data: rowList = [],
    error: rowListError,
    isLoading: areRowsLoading,
    // isFetching: areRowsFetching,
    // isSuccess: areRowsLoaded
  } = useGetRowListQuery();

  const [addRow,
    // { error: rowAdditionError, isLoading: isRowAdding, isSuccess: isRowAdded }
  ] = useAddRowMutation();

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();

        setEditedRowId('');
        setRowData({});
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleAdd = (evt: React.KeyboardEvent<HTMLInputElement>, parentId: number | null) => {
    if (evt.key === 'Enter') {
      const data = {...rowData, parentId};
      setEditedRowId('');
      setRowData({});
      addRow(data as Omit<IRow, 'child' | 'id'>);
    }
  }

  const handleRowChange = (evt: React.ChangeEvent<HTMLInputElement>, prop: string) => {
    setRowData((oldData) => ({...oldData, [prop]: evt.target.value }));
  };

  return areRowsLoading
    ? <p>Loading...</p>
    : rowListError 
      ? <p>{getErrorMessage(rowListError)}</p>
      : <table className="table">
          <caption>{title}</caption>
          <thead>
            <tr>
              {headProperties.map((prop: string) => {
                return <th key={uuidv4()}>{prop}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {rowList.length
              ? rowList.map((row) => (
                <TableRow
                  key={row.id}
                  row={row}
                  properties={properties}
                  editedRowId={editedRowId}
                  setEditedRowId={setEditedRowId}
                  rowData={rowData}
                  setRowData={setRowData}
                  marginLeft={0}
                />))
              : <tr>
                  <td>
                  <IconButton
                    title="Add"
                    className="table__add-row"
                    image={doc}
                    disabled
                  />
                  </td>
                  {properties.map((prop, i) => {
                    return (
                      <td key={i}>
                        <input
                          type={props[prop]['type']}
                          min={0}
                          step={1}
                          name={prop}
                          value={rowData![prop as keyof typeof rowData]}
                          onChange={(evt) => handleRowChange(evt, prop)}
                          onKeyDown={(evt) => handleAdd(evt, null)}
                          required
                        />
                      </td>
                    )
                  })}
                </tr>
            }
          </tbody>
        </table>
}
