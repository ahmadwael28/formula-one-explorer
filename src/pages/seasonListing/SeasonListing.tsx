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
import useStyles from './styles';

interface Season {
    season: string;
    url: string;
}

const SeasonListing: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();

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
        <div className={classes.root}>
            <Breadcrumb links={[]} currentPage="Seasons" />
            <Typography variant="h4" component="h1" className={classes.title}>
                Seasons
            </Typography>

            {!error && (
                <div className={classes.toggleContainer}>
                    <Typography variant="subtitle1" style={{ color: theme.palette.text.secondary }}>
                        Select a season to view its races.
                    </Typography>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewChange}
                        aria-label="view mode"
                        className={classes.toggleButtonGroup}
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
                <Box className={classes.loadingContainer}>
                    <CircularProgress color="primary" />
                </Box>
            ) : error ? (
                <Box className={classes.errorContainer}>
                    <Typography variant="h6" style={{ color: theme.palette.error.main }}>
                        {error}
                    </Typography>
                </Box>
            ) : (
                <div className={`${classes.listContainer} ${animationClass}`}>
                    {viewMode === 'list' ? (
                        <SeasonList seasons={seasons} />
                    ) : (
                        <Grid2 container spacing={3} justifyContent="center" style={{ padding: '8px' }}>
                            {seasons.map((season, index) => (
                                <Grid2 size={{ xs: 6, sm: 6, md: 4, lg: 2.4 }} key={season.season}>
                                    <SeasonCard season={season} index={index} />
                                </Grid2>
                            ))}
                        </Grid2>
                    )}
                </div>
            )}

            {!error && (
                <Box className={classes.paginationContainer}>
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
                </Box>
            )}
        </div>
    );
};

export default SeasonListing;
