// // src/components/common/PaginatedTable.tsx
// import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Typography } from '@mui/material';

// interface PaginatedTableProps<T> {
//     headers: string[];
//     data: T[];
//     rowsPerPage?: number;
//     renderRow: (item: T) => React.ReactNode;
// }

// const PaginatedTable = <T,>({ headers, data, rowsPerPage = 10, renderRow }: PaginatedTableProps<T>) => {
//     const [page, setPage] = useState(0);
//     const [rowsPerPageSetting, setRowsPerPageSetting] = useState(rowsPerPage);

//     const handleChangePage = (_event: unknown, newPage: number) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPageSetting(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const paginatedData = data.slice(page * rowsPerPageSetting, page * rowsPerPageSetting + rowsPerPageSetting);

//     return (
//         <Paper>
//             <TableContainer>
//                 <Table aria-label="paginated table">
//                     <TableHead>
//                         <TableRow>
//                             {headers.map((header) => (
//                                 <TableCell key={header}>
//                                     <Typography variant="body2" fontWeight="bold">
//                                         {header}
//                                     </Typography>
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {paginatedData.map((item, index) => (
//                             <TableRow key={index}>{renderRow(item)}</TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 20]}
//                 component="div"
//                 count={data.length}
//                 rowsPerPage={rowsPerPageSetting}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//         </Paper>
//     );
// };

// export default PaginatedTable;



// src/components/common/PaginatedTable.tsx
// import React, { useState } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TablePagination,
//     Paper,
// } from '@mui/material';

// interface PaginatedTableProps<T> {
//     headers: string[];
//     data: T[];
//     rowsPerPage: number;
//     renderRow: (item: T, index: number) => React.ReactNode;
// }

// const PaginatedTable = <T extends unknown>({
//     headers,
//     data,
//     rowsPerPage,
//     renderRow,
// }: PaginatedTableProps<T>) => {
//     const [page, setPage] = useState(0);

//     const handleChangePage = (_event: unknown, newPage: number) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (
//         event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         setPage(0);
//     };

//     const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     return (
//         <Paper style={{ overflow: 'hidden', width: '100%' }}>
//             <TableContainer>
//                 <Table aria-label="paginated table">
//                     <TableHead>
//                         <TableRow>
//                             {headers.map((header, index) => (
//                                 <TableCell key={index} style={{ fontWeight: 'bold' }}>
//                                     {header}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {paginatedData.map((item, index) => (
//                             <TableRow key={index}>{renderRow(item, index + page * rowsPerPage)}</TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 rowsPerPageOptions={[10, 20, 30]}
//                 component="div"
//                 count={data.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//         </Paper>
//     );
// };

// export default PaginatedTable;




// src/components/common/PaginatedTable.tsx
// import React, { useState } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TablePagination,
//     Paper,
// } from '@mui/material';

// interface PaginatedTableProps<T> {
//     headers: string[];
//     data: T[];
//     rowsPerPage: number;
//     renderRow: (item: T, index: number) => React.ReactNode;
//     fixedHeight?: number; // Optional prop to set a fixed height
// }

// const PaginatedTable = <T extends unknown>({
//     headers,
//     data,
//     rowsPerPage,
//     renderRow,
//     fixedHeight = 400, // Default fixed height
// }: PaginatedTableProps<T>) => {
//     const [page, setPage] = useState(0);

//     const handleChangePage = (_event: unknown, newPage: number) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (
//         event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         setPage(0);
//     };

//     const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     return (
//         <Paper style={{ overflow: 'hidden', width: '100%' }}>
//             <TableContainer style={{ height: fixedHeight, overflowY: 'auto' }}>
//                 <Table aria-label="paginated table">
//                     <TableHead>
//                         <TableRow>
//                             {headers.map((header, index) => (
//                                 <TableCell key={index} style={{ fontWeight: 'bold' }}>
//                                     {header}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {paginatedData.map((item, index) => (
//                             <TableRow key={index}>{renderRow(item, index + page * rowsPerPage)}</TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 rowsPerPageOptions={[10, 20, 30]}
//                 component="div"
//                 count={data.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//         </Paper>
//     );
// };

// export default PaginatedTable;



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
    fixedHeight?: number; // Optional prop to set a fixed height
}

const PaginatedTable = <T extends unknown>({
    headers,
    data,
    rowsPerPage: initialRowsPerPage,
    renderRow,
    fixedHeight = 400, // Default fixed height
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
        setPage(0); // Reset to the first page whenever rows per page changes
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((item, index) => (
                            <TableRow key={index}>{renderRow(item, index + page * rowsPerPage)}</TableRow>
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
