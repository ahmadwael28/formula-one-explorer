import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface BreadcrumbLink {
    label: string;
    path: string;
}

export interface BreadcrumbProps {
    links: BreadcrumbLink[]; // Ensure 'links' is part of props
    currentPage: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ links, currentPage }) => {
    const navigate = useNavigate();

    return (
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '16px' }}>
            {links.map((link, index) => (
                <Link
                    key={index}
                    color="inherit"
                    onClick={() => navigate(link.path)}
                    style={{ cursor: 'pointer' }}
                >
                    {link.label}
                </Link>
            ))}
            <Typography color="textPrimary">{currentPage}</Typography>
        </Breadcrumbs>
    );
};

export default Breadcrumb;
