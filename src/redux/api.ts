import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RecalculatedRowsResponse, IRow, ModifyRowRequest } from './api.types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `http://185.244.172.108:8081/v1/outlay-rows/entity/113031/row/` }),
  tagTypes: ['Row'],
  endpoints: (builder) => ({
    getRowList: builder.query<IRow[], void>({
      query: () => 'list',
      providesTags: ['Row'],
    }),
    addRow: builder.mutation<RecalculatedRowsResponse, Omit<IRow, 'child' | 'id'>>({
      query: (row) => ({
        url: 'create',
        method: 'POST',
        body: row,
      }),
      invalidatesTags: ['Row'],
    }),
    modifyRow: builder.mutation<RecalculatedRowsResponse, ModifyRowRequest>({
      query: ({rID, data}) => ({
        url: `${rID}/update`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Row'],
    }),
    deleteRow: builder.mutation<RecalculatedRowsResponse, number>({
      query: (rID) => ({
        url: `${rID}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Row'],
    }),
  }),
});

export const {
  useGetRowListQuery,
  useAddRowMutation,
  useModifyRowMutation,
  useDeleteRowMutation,
} = api;
