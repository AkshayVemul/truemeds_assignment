import { Container, Typography, Box } from '@mui/material';
import LoginForm from '../components/LoginForm';

export default function Login() {
    return (
        <Container maxWidth="sm" sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center'
        }}>

            <Box
                sx={{
                    bgcolor: '#fff',
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                }}
            >
                <Typography variant="h6" component="h1" sx={{ mb: 3 }}>
                    Login
                </Typography>

                <LoginForm />

            </Box>

        </Container>
    )
}
