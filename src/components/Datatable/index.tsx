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

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useTranslate from "@/hooks/useTranslate";

const data: models.Product[] = [
  {
    id: 1,
    nome: "Produto A",
    categoria: "Eletrônicos",
    preco: 299.99,
    quantidade: 50,
    ano: 2023,
    mes: 1,
    cor: "Vermelho",
    fabricante: "Fabricante X",
  },
  {
    id: 2,
    nome: "Produto B",
    categoria: "Eletrônicos",
    preco: 199.99,
    quantidade: 30,
    ano: 2023,
    mes: 2,
    cor: "Azul",
    fabricante: "Fabricante Y",
  },
  {
    id: 3,
    nome: "Produto C",
    categoria: "Móveis",
    preco: 159.75,
    quantidade: 20,
    ano: 2022,
    mes: 3,
    cor: "Verde",
    fabricante: "Fabricante X",
  },
  {
    id: 4,
    nome: "Produto D",
    categoria: "Móveis",
    preco: 189.99,
    quantidade: 15,
    ano: 2022,
    mes: 4,
    cor: "Vermelho",
    fabricante: "Fabricante Y",
  },
  {
    id: 5,
    nome: "Produto E",
    categoria: "Roupas",
    preco: 49.99,
    quantidade: 100,
    ano: 2023,
    mes: 5,
    cor: "Preto",
    fabricante: "Fabricante Z",
  },
  {
    id: 6,
    nome: "Produto F",
    categoria: "Roupas",
    preco: 59.99,
    quantidade: 80,
    ano: 2023,
    mes: 6,
    cor: "Branco",
    fabricante: "Fabricante X",
  },
  {
    id: 7,
    nome: "Produto G",
    categoria: "Livros",
    preco: 24.5,
    quantidade: 200,
    ano: 2021,
    mes: 7,
    cor: "Cinza",
    fabricante: "Fabricante Z",
  },
  {
    id: 8,
    nome: "Produto H",
    categoria: "Livros",
    preco: 29.99,
    quantidade: 150,
    ano: 2021,
    mes: 8,
    cor: "Cinza",
    fabricante: "Fabricante Y",
  },
  {
    id: 9,
    nome: "Produto I",
    categoria: "Beleza",
    preco: 19.99,
    quantidade: 75,
    ano: 2022,
    mes: 9,
    cor: "Branco",
    fabricante: "Fabricante X",
  },
  {
    id: 10,
    nome: "Produto J",
    categoria: "Beleza",
    preco: 25.99,
    quantidade: 60,
    ano: 2022,
    mes: 10,
    cor: "Preto",
    fabricante: "Fabricante Z",
  },
];

export const columns: ColumnDef<models.Product>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
  },
  {
    accessorKey: "preco",
    header: () => <div className="text-right">Preço</div>,
    cell: ({ row }) => {
      const preco = parseFloat(row.getValue("preco"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(preco);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "quantidade",
    header: "Quantidade",
  },
  {
    accessorKey: "ano",
    header: "Ano",
  },
  {
    accessorKey: "mes",
    header: "Mês",
  },
  {
    accessorKey: "cor",
    header: "Cor",
  },
  {
    accessorKey: "fabricante",
    header: "Fabricante",
  },
];

const Datatable = () => {
  const { t } = useTranslate("DATATABLE");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t("PREVIOUS")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t("NEXT")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Datatable;
