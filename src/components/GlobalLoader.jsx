//MUI 
import { Box, LinearProgress } from '@mui/material';

import { useSelector } from 'react-redux';

export default function GlobalLoader() {

    const isLoading = useSelector((state) => state.global_loader.isLoading);

    if (isLoading) {

        return (

            <Box sx={{
                display: 'flex',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: '#00000080'
            }}>
                <LinearProgress sx={{ width: "100%" }} />
            </Box>

        );
    }
    return null;
}
