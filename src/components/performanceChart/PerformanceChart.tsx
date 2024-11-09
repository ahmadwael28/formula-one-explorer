import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import CustomTooltip from '../customTooltip/CustomTooltip';

interface ChartData {
    name: string;
    time: number;
    formattedTime: string;
}

interface PerformanceChartProps {
    data: ChartData[];
    formatMillisToTime: (millis: string) => string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data, formatMillisToTime }) => {
    const theme = useTheme();

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} layout="vertical" barSize={20}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    type="number"
                    tickFormatter={(value) => formatMillisToTime(value.toString())}
                    label={{ value: "Time", position: "insideBottom", offset: -5 }}
                    tick={{ fill: '#cccccc' }}
                />
                <YAxis dataKey="name" type="category" width={150} tick={{ fill: '#cccccc' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="time" fill={theme.palette.primary.main} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default PerformanceChart;
