//MUI 
import { Typography, Box } from '@mui/material';

export default function ArticleCard({article}) {
    return (
        <Box sx={{
            bgcolor: '#fff',
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            mb: 4,
        }}>
            <Typography variant="h4" sx={{
                mb: 2,
            }}>{article.categoryName}</Typography>

            <Typography variant="h6" sx={{
                mb: 3,
            }}>{article.name}</Typography>

            <Typography variant="p" component="p" sx={{
                mb: 3,
                lineHeight: 1.7
            }}>{article.description}</Typography>

            <Typography variant="h6" sx={{
                mb: 1,
            }}>Author By: {article.author}</Typography>

            <Typography variant="p" component="p" sx={{
                lineHeight: 1.7
            }}>Created On :{article.createdOn}</Typography>

        </Box>
    );
}
