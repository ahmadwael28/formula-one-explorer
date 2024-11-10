import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
} from '@mui/material';

interface PaginatedTableProps<T> {
    headers: string[];
    data: T[];
    rowsPerPage: number;
    renderRow: (item: T, index: number) => React.ReactNode;
    actions?: (item: T) => React.ReactNode;
    onRowClick?: (item: T) => void;
    fixedHeight?: number;
}

const PaginatedTable = <T extends unknown>({
    headers,
    data,
    rowsPerPage: initialRowsPerPage,
    renderRow,
    actions,
    onRowClick,
    fixedHeight = 400,
}: PaginatedTableProps<T>) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper style={{ overflow: 'hidden', width: '100%' }}>
            <TableContainer style={{ height: fixedHeight, overflowY: 'auto' }}>
                <Table aria-label="paginated table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableCell key={index} style={{ fontWeight: 'bold' }}>
                                    {header}
                                </TableCell>
                            ))}
                            {actions && <TableCell />}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((item, index) => (
                            <TableRow
                                key={index}
                                hover
                                onClick={() => onRowClick?.(item)}
                                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                            >
                                {renderRow(item, index + page * rowsPerPage)}
                                {actions && (
                                    <TableCell>
                                        {actions(item)}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default PaginatedTable;
