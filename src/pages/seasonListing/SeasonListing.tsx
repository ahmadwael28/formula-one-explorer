import React, { useEffect, useState } from 'react';
import { fetchSeasons } from '../../api/api';
import SeasonCard from '../../components/seasonCard/SeasonCard';
import SeasonList from '../../components/seasonList/SeasonList';
import Breadcrumb from '../../components/common/breadCrumb/Breadcrumb';
import {
    ToggleButton,
    ToggleButtonGroup,
    Pagination,
    Typography,
    CircularProgress,
    Box,
    Grid2,
    useTheme,
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import GridViewIcon from '@mui/icons-material/GridView';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Season {
    season: string;
    url: string;
}

const SeasonListing: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [seasons, setSeasons] = useState<Season[]>([]);
    const [totalSeasons, setTotalSeasons] = useState(0);
    const [viewMode, setViewMode] = useState<'list' | 'card'>('card');
    const [currentPage, setCurrentPage] = useState(1);
    const [animationClass, setAnimationClass] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const seasonsPerPage = 10;

    const fetchAndSetSeasons = async (page: number) => {
        setLoading(true);
        setError(null);
        setAnimationClass('fade-out');
        setTimeout(async () => {
            const offset = (page - 1) * seasonsPerPage;
            try {
                const { seasons, total } = await fetchSeasons(seasonsPerPage, offset);
                if (seasons.length === 0) {
                    setError('No seasons found.');
                } else {
                    setSeasons(seasons);
                    setTotalSeasons(total);
                }
                setAnimationClass('');
                setTimeout(() => {
                    setAnimationClass('slide-in');
                    setLoading(false);
                }, 50);
            } catch (error) {
                console.error("Failed to fetch seasons data:", error);
                setError("Failed to fetch seasons data. Please try again later.");
                setLoading(false);
            }
        }, 300);
    };

    useEffect(() => {
        fetchAndSetSeasons(currentPage);
    }, [currentPage]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        fetchAndSetSeasons(page);
        setCurrentPage(page);
    };

    const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: 'list' | 'card') => {
        if (newView) {
            setViewMode(newView);
        }
    };

    const totalPages = Math.ceil(totalSeasons / seasonsPerPage);

    return (
        <div style={{ color: theme.palette.text.primary, paddingTop: '1rem', height: '100vh', display: 'flex', flexDirection: 'column', boxSizing: "border-box", overflowY: "hidden" }}>
            <Breadcrumb
                links={[]}
                currentPage="Seasons"
            />
            <Typography
                variant="h4"
                component="h1"
                style={{
                    fontSize: '52px',
                    fontWeight: 'bold',
                    color: theme.palette.text.secondary,
                    marginBottom: '8px',
                    textAlign: isSmallScreen ? 'center' : 'left',
                }}
            >
                Seasons
            </Typography>

            {!error && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: isSmallScreen ? 'column' : 'row',
                        justifyContent: isSmallScreen ? 'center' : 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px',
                        textAlign: isSmallScreen ? 'center' : 'left',
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        style={{
                            color: theme.palette.text.secondary,
                            marginBottom: isSmallScreen ? '8px' : '0',
                        }}
                    >
                        Select a season to view its races.
                    </Typography>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewChange}
                        aria-label="view mode"
                        style={{
                            alignSelf: isSmallScreen ? 'center' : 'flex-end',
                        }}
                    >
                        <ToggleButton value="list" aria-label="list view">
                            <ListIcon />
                        </ToggleButton>
                        <ToggleButton value="card" aria-label="card view">
                            <GridViewIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            )}

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" style={{ height: 'calc(100vh - 295px)' }}>
                    <CircularProgress color="primary" />
                </Box>
            ) : error ? (
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ flexGrow: 1 }}>
                    <Typography variant="h6" style={{ color: theme.palette.error.main, marginBottom: '16px', textAlign: 'center' }}>
                        {error}
                    </Typography>
                </Box>
            ) : (
                <div
                    className={animationClass}
                    style={{
                        display: loading ? 'none' : 'flex',
                        flexDirection: 'column',
                        transition: 'opacity 0.5s ease',
                        height: 'calc(100vh - 295px)',
                        overflowY: 'auto',
                    }}
                >
                    {viewMode === 'list' ? (
                        <SeasonList seasons={seasons} />
                    ) : (
                        <Grid2 container spacing={3} justifyContent="center" style={{ padding: '8px', overflowY: "auto" }}>
                            {seasons.map((season, index) => (
                                <Grid2 size={{ xs: 6, sm: 6, md: 4, lg: 2.4 }} key={season.season}>
                                    <SeasonCard season={season} index={index} /> {/* Pass index */}
                                </Grid2>
                            ))}
                        </Grid2>
                    )}
                </div>
            )}

            {!error && (
                <Box display="flex" justifyContent="center" marginTop="16px">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            )}
        </div>
    );
};

export default SeasonListing;
