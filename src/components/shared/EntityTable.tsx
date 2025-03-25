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
import { useGitHubStore } from "@/store/githubStore";

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
  const { layout } = useGitHubStore(); // Fetch layout from the store
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

  const spacing = layout === "compact" ? "xs" : "md";

  return (
    <Box>
      <Group grow mb={spacing}>
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
                size={layout === "compact" ? "sm" : "md"}
              />
            )
        )}
      </Group>

      <Table
        withColumnBorders
        highlightOnHover
        striped
        verticalSpacing={spacing}
        horizontalSpacing={spacing}
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
                <Text fw={700} size={layout === "compact" ? "sm" : "md"}>
                  {column.header}
                </Text>
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
                    }}
                    className="text-overflow-ellipsis"
                  >
                    {column.render ? (
                      column.render(item)
                    ) : (
                      <Text size={layout === "compact" ? "sm" : "md"}>
                        {(item[column.key as keyof T] as React.ReactNode) ||
                          "-"}
                      </Text>
                    )}
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
                <Text color="dimmed" size={layout === "compact" ? "sm" : "md"}>
                  {emptyMessage}
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      <Group mt={spacing} justify="space-between">
        <Select
          value={pageSize.toString()}
          onChange={(value) => setPageSize(Number(value))}
          data={["5", "10", "20", "50"]}
          label="Rows per page"
          maw={100}
          size={layout === "compact" ? "sm" : "md"}
        />
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={setCurrentPage}
          size={layout === "compact" ? "xs" : "sm"}
        />
      </Group>
    </Box>
  );
}
