import React from "react";
import {flexRender, getCoreRowModel, getSortedRowModel, useReactTable,} from "@tanstack/react-table";

function Table({ columns, data }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                className="px-2 py-2 text-left text-sm font-medium text-gray-700 tracking-wider"
                                style={{
                                    maxWidth: header.column.columnDef.maxWidth || "auto",
                                }}
                            >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td
                                key={cell.id}
                                className={`px-2 py-2 text-sm text-gray-500 truncate overflow-hidden text-ellipsis`}
                                style={{
                                    maxWidth: cell.column.columnDef.maxWidth || "auto",
                                }}
                                title={cell.getValue() === undefined ? "" : String(cell.getValue()) } // Подсказка при наведении
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
