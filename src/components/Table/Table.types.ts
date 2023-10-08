export interface TableProps {
  tableData: {
    title: string;
    headProperties: string[];
    properties: string[];
    props: {
      [key: string]: {
        display: string,
        type: string
      },
    },
  },
}