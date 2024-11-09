import React from 'react';
import { TooltipProps } from 'recharts';
import moment from 'moment';

interface CustomTooltipProps extends TooltipProps<number, string> { }

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length && payload[0].value != null) {
        const time = payload[0].value as number;
        const duration = moment.duration(time, 'milliseconds');
        const formattedTime = moment.utc(duration.asMilliseconds()).format('H:mm:ss.SSS');

        return (
            <div style={{ backgroundColor: '#ffffff', padding: '5px', border: '1px solid #cccccc', color: '#333333', borderRadius: '4px' }}>
                <p style={{ margin: 0 }}>{`Time: ${formattedTime}`}</p>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;
