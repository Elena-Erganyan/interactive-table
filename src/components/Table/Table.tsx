import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAddRowMutation, useGetRowListQuery } from '../../redux/api';
import { TableRow } from '../TableRow';
import { IconButton } from '../IconButton';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { IRow } from '../../redux/api.types';
import { TableProps } from './Table.types';
import './Table.style.scss';
import doc from '../../assets/document.svg';
import { emptyRow } from '../../config';

export function Table ({tableData}: TableProps) {
  const { title, headProperties, properties } = tableData;

  const [editedRowId, setEditedRowId] = useState<number | string>();
  const [rowData, setRowData] = useState<Partial<IRow>>(emptyRow);

  const { data: rowList = [], error: rowListError, isLoading: areRowsLoading } = useGetRowListQuery();

  const [addRow, { error: rowAdditionError }] = useAddRowMutation();

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
      setRowData(emptyRow);
      addRow(data as Omit<IRow, 'child' | 'id'>);
    }
  };

  const handleRowChange = (evt: React.ChangeEvent<HTMLInputElement>, prop: string) => {
    setRowData((oldData) => ({...oldData, [prop]: evt.target.value }));
  };

  return areRowsLoading
    ? <p>Loading...</p>
    : rowListError || rowAdditionError
      ? <p className="error">{getErrorMessage(rowListError || rowAdditionError)}</p>
      : <table className="table">
          <caption className="table__caption">
            <span>{title}</span>
          </caption>
          <thead className="table__head">
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
                  handleAdd={handleAdd}
                  handleRowChange={handleRowChange}
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
                          type={typeof rowData![prop as keyof typeof rowData]}
                          name={prop}
                          value={rowData![prop as keyof typeof rowData]}
                          onChange={(evt) => handleRowChange(evt, prop)}
                          onKeyDown={(evt) => handleAdd(evt, null)}
                          required
                          {...typeof rowData![prop as keyof typeof rowData] === 'number'
                            && {min: 0, step: 1}
                          }
                        />
                      </td>
                    )
                  })}
                </tr>
            }
          </tbody>
        </table>
}
