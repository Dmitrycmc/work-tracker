import { format, fromMs } from '../../utils/time-utils';
import React from 'react';

export const Time = ({ value, className, delimiter, hideSeconds }) => {
    const { hours, minutes, seconds } = fromMs(value);

    return (
        <span className={className}>
            {format(hours)}
            {delimiter ? ':' : ' '}
            {format(minutes)}
            {!hideSeconds && (
                <span>
                    {delimiter ? ':' : ' '}
                    {format(seconds)}
                </span>
            )}
        </span>
    );
};
