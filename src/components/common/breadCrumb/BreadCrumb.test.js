// Breadcrumb.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Breadcrumb from './Breadcrumb';
import '@testing-library/jest-dom';

describe('Breadcrumb Component', () => {
    const links = [
        { label: 'Home', path: '/' },
        { label: 'Category', path: '/category' },
    ];
    const currentPage = 'Product';

    test('renders breadcrumb links and current page label', () => {
        render(
            <MemoryRouter>
                <Breadcrumb links={links} currentPage={currentPage} />
            </MemoryRouter>
        );

        // Check if each link and current page label is rendered
        links.forEach(link => {
            expect(screen.getByText(link.label)).toBeInTheDocument();
        });
        expect(screen.getByText(currentPage)).toBeInTheDocument();
    });

    test('navigates to the correct path when a breadcrumb link is clicked', () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <Breadcrumb links={links} currentPage={currentPage} />
            </Router>
        );

        // Click on the first link
        userEvent.click(screen.getByText('Home'));

        // Assert that the correct path was pushed to history
        expect(history.location.pathname).toBe('/');
    });
});
