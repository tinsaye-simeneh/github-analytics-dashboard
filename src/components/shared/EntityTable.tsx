"use client";

import { useState } from "react";
import {
  Table,
  Text,
  Box,
  TextInput,
  Pagination,
  Select,
  Group,
} from "@mantine/core";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  filterable?: boolean;
}

interface EntityTableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
}

export default function EntityTable<T>({
  data,
  columns,
  emptyMessage = "No data available",
}: EntityTableProps<T>) {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredData = data.filter((item) =>
    columns.every((column) =>
      filters[column.key as string]
        ? String(item[column.key as keyof T] || "")
            .toLowerCase()
            .includes(filters[column.key as string].toLowerCase())
        : true
    )
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Box>
      {/* Filters */}
      <Group grow mb="md">
        {columns.map(
          (column) =>
            column.filterable && (
              <TextInput
                key={column.key as string}
                placeholder={`Filter ${column.header}`}
                value={filters[column.key as string] || ""}
                onChange={(e) =>
                  handleFilterChange(column.key as string, e.target.value)
                }
              />
            )
        )}
      </Group>

      <Table
        withColumnBorders
        highlightOnHover
        striped
        verticalSpacing="md"
        horizontalSpacing="md"
        style={{
          tableLayout: "fixed",
          width: "100%",
        }}
      >
        <Table.Thead>
          <Table.Tr>
            {columns.map((column) => (
              <Table.Th
                key={column.key as string}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Text fw={700}>{column.header}</Text>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <Table.Tr key={index}>
                {columns.map((column) => (
                  <Table.Td
                    key={column.key as string}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {column.render
                      ? column.render(item)
                      : (item[column.key as keyof T] as React.ReactNode) || "-"}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td
                colSpan={columns.length}
                style={{ textAlign: "center" }}
              >
                <Text color="dimmed">{emptyMessage}</Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      <Group mt="md" justify="space-between">
        <Select
          value={pageSize.toString()}
          onChange={(value) => setPageSize(Number(value))}
          data={["5", "10", "20", "50"]}
          label="Rows per page"
          maw={100}
        />
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={setCurrentPage}
          size="sm"
        />
      </Group>
    </Box>
  );
}
