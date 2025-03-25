"use client";
import { Table, Text, Box } from "@mantine/core";

interface Column<T> {
  key: keyof T | string; 
  header: string;
  render?: (item: T) => React.ReactNode; 
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
  return (
    <Box style={{ overflowX: "auto" }}>
      <Table
        withColumnBorders
        highlightOnHover
        verticalSpacing="md"
        horizontalSpacing="md"
      >
        <Table.Thead>
          <Table.Tr>
            {columns.map((column) => (
              <Table.Th key={column.key as string}>
                <Text fw={700}>{column.header}</Text>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <Table.Tr key={index}>
                {columns.map((column) => (
                  <Table.Td key={column.key as string}>
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
    </Box>
  );
}
