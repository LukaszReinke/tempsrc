import { ReactNode } from 'react';

export type TableRowProps = {
  columns: ReactNode[];
  trClassName?: string;
  rowIndex: number;
  handleRowClick?: () => void;
};

export const TableRow = ({ columns, trClassName, rowIndex, handleRowClick }: TableRowProps) => {
  return (
    <tr
      onClick={handleRowClick}
      className={
        trClassName ||
        `text-center h-[42px] ${rowIndex % 2 === 0 ? 'bg-zinc-800' : 'bg-zinc-900'} shadow hover:shadow-sm hover:shadow-amber-500/50 transition-shadow rounded-sm hover:cursor-pointer`
      }
    >
      {columns.map((column, index) => (
        <td key={index} className="p-4 text-sm">
          {column}
        </td>
      ))}
    </tr>
  );
};

export type TableHeader = {
  label?: string;
  onClick?: () => void;
  thClassName?: string;
};

export type TableProps = {
  headers: (TableHeader | null)[];
  rows: Array<Omit<TableRowProps, 'rowIndex'>>;
};

export const Table = ({ headers, rows }: TableProps) => {
  return (
    <table className="border-collapse min-w-full bg-transparent text-white border-separate border-spacing-y-2">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className={header?.thClassName || 'p-4 font-medium text-sm'}
              onClick={header?.onClick}
            >
              {header?.label || null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(({ columns, trClassName, handleRowClick }, rowIndex) => (
          <TableRow
            handleRowClick={handleRowClick}
            key={rowIndex}
            rowIndex={rowIndex}
            columns={columns}
            trClassName={trClassName}
          />
        ))}
      </tbody>
    </table>
  );
};
