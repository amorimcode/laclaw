"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useTranslate from "@/hooks/useTranslate";

type DatatableProps = {
  data: models.Product[] | any[];
  sumField: string;
  viewBy?: string; // Novo prop
  detailBy?: string; // Novo prop
};

const Datatable = ({ data, sumField, viewBy, detailBy }: DatatableProps) => {
  const { t } = useTranslate("DATATABLE");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const filteredData = React.useMemo(() => {
    let filtered = [...data];
    if (viewBy) {
      filtered = filtered.filter((item) => item[viewBy]);
    }
    if (detailBy) {
      filtered = filtered.filter((item) => item[detailBy]);
    }
    return filtered;
  }, [data, viewBy, detailBy]);

  const columns = React.useMemo(() => {
    const viewByColumn = viewBy
      ? [
          {
            accessorKey: viewBy,
            header: viewBy.charAt(0).toUpperCase() + viewBy.slice(1),
          },
        ]
      : [];

    const sumFieldColumn = sumField
      ? [
          {
            accessorKey: sumField,
            header: sumField.charAt(0).toUpperCase() + sumField.slice(1),
            cell: ({ row }: { row: any }) => {
              const value = row.getValue(sumField);
              if (typeof value === "number") {
                if (sumField === "preco") {
                  return new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(value);
                }
                return value;
              }
              return value;
            },
          },
        ]
      : [];

    return [...viewByColumn, ...sumFieldColumn];
  }, [viewBy, sumField]);

  const totalSum = React.useMemo(() => {
    return filteredData.reduce((sum, item) => {
      const value = item[sumField];
      if (typeof value === "number") {
        return sum + value;
      }
      return sum;
    }, 0);
  }, [filteredData, sumField]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4"></div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="d-flex pt-4">
        <strong>{t("TOTAL")}: </strong>
        {sumField === "preco"
          ? new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalSum)
          : totalSum}
      </div>
    </div>
  );
};

export default Datatable;
