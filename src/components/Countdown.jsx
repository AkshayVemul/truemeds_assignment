import React, { useEffect, useState } from 'react';

//MUI 
import { Box, Button, Typography } from '@mui/material';


const calculateRemainingTime = (e) => {

    const total = Date.parse(e) - Date.parse(new Date());

    const seconds = Math.floor((total / 1000) % 60);

    const minutes = Math.floor((total / 1000 / 60) % 60);

    const hours = Math.floor((total / 1000 * 60 * 60) % 24);

    return {
        total, hours, minutes, seconds
    };
}

const getDurationTime = (seconds) => {

    let duration = new Date();

    duration.setSeconds(duration.getSeconds() + seconds);

    return duration;

}

function Countdown({ onComplete }) {

    const [time, setTime] = useState("00 : 00 : 05");

    const [durationTime, setDurationTime] = useState(() => {

        return getDurationTime(5);
    })

    const reset = () => {

        setTime("00 : 00 : 05")

        setDurationTime(
            getDurationTime(5)
        )

        onComplete(false);
    }

    useEffect(() => {

        let intervalId = setInterval(() => {

            let { total, hours, minutes, seconds } = calculateRemainingTime(durationTime);

            if (total >= 0) {

                setTime(
                    `${hours > 9 ? hours : '0' + hours} : 
                    ${minutes > 9 ? minutes : '0' + minutes} : 
                    ${seconds > 9 ? seconds : '0' + seconds}`
                )
            } else {

                onComplete?.(true);

                clearTimeout(intervalId)
            }

        }, 1000)

        return () => {

            console.log("Timeout Cleared on Unmount");

            clearTimeout(intervalId)
        }

    }, [durationTime, onComplete])

    return (
        <Box>
            <Typography variant="h1">{time}</Typography>

            <Box>
                <Button onClick={reset}>Reset</Button>
            </Box>
        </Box>
    );
}

//Memoized to avoid re-render on Oncomplete 

export default React.memo(Countdown)
