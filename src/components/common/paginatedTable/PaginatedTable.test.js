// src/components/common/paginatedTable/PaginatedTable.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginatedTable from './PaginatedTable';
import { TableCell } from '@mui/material';
import '@testing-library/jest-dom';

describe('PaginatedTable Component', () => {
    const headers = ['Name', 'Age'];
    const data = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 35 },
        { name: 'David', age: 40 },
    ];
    const renderRow = (item) => (
        <>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.age}</TableCell>
        </>
    );

    test('renders table headers', () => {
        render(<PaginatedTable headers={headers} data={data} rowsPerPage={10} renderRow={renderRow} />);

        headers.forEach(header => {
            expect(screen.getByText(header)).toBeInTheDocument();
        });
    });

    test('displays correct number of rows per page', () => {
        render(<PaginatedTable headers={headers} data={data} rowsPerPage={10} renderRow={renderRow} />);

        // 4 data rows + 1 header row
        expect(screen.getAllByRole('row')).toHaveLength(data.length + 1);
    });

    test('handles pagination correctly', () => {
        render(<PaginatedTable headers={headers} data={data} rowsPerPage={2} renderRow={renderRow} />);

        // Check first page content
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
        expect(screen.queryByText('Charlie')).not.toBeInTheDocument();

        // Go to next page
        fireEvent.click(screen.getByLabelText('Go to next page'));

        // Check second page content
        expect(screen.getByText('Charlie')).toBeInTheDocument();
        expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });

    test('handles row click if onRowClick is provided', () => {
        const handleRowClick = jest.fn();
        render(
            <PaginatedTable
                headers={headers}
                data={data}
                rowsPerPage={10}
                renderRow={renderRow}
                onRowClick={handleRowClick}
            />
        );

        // Simulate clicking on a row
        fireEvent.click(screen.getByText('Alice'));

        expect(handleRowClick).toHaveBeenCalledWith(data[0]);
    });

    test('renders actions column if actions prop is provided', () => {
        const renderActions = (item) => <button>{`Action for ${item.name}`}</button>;
        render(
            <PaginatedTable
                headers={headers}
                data={data}
                rowsPerPage={10}
                renderRow={renderRow}
                actions={renderActions}
            />
        );

        data.forEach(item => {
            expect(screen.getByText(`Action for ${item.name}`)).toBeInTheDocument();
        });
    });
});
