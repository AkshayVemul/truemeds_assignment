import { useEffect, useState } from "react";

import Countdown from "../components/Countdown";
import ArticleCard from "../components/ArticleCard";

//MUI 
import { Box, Button, Container, Typography } from '@mui/material';

import { useSelector } from "react-redux";

//CUSTOM HOOK
import { useAysnc } from "../util/hooks";

//API RELATED IMPORTS
import axios from "axios";
import { ENV, SELECTORS, SERVICE } from "../config/apiConfig";

//GLOBAL STATE IMPORTS
import { useDispatch } from "react-redux";
import { update as globalLoaderUpadte } from '../feature/loaderSlice';
import { update } from '../feature/userSlice';

//ROUTER IMPORTS
import { useNavigate } from "react-router-dom";



const Article = () => {

    const uAcessToken = useSelector(state => state.global_user.uAcessToken);

    const navigate = useNavigate();

    const [countDownCompleted, setCountDownCompleted] = useState(false);

    const dispatch = useDispatch();

    const { state, run } = useAysnc();

    const articleList = state.data?.data?.result?.article || [];

    useEffect(() => {

        dispatch(globalLoaderUpadte(state.isLoading))

    }, [state.isLoading, dispatch])

    useEffect(() => {

        if (uAcessToken && countDownCompleted) {

            run(axios({
                url: `${ENV.STAGE}${SERVICE.articleService}${SELECTORS.getArticleListing}`,
                method: 'post',
                headers: {
                    Authorization: `Bearer ${uAcessToken}`
                }
            }))

        } else {

        }

    }, [uAcessToken, countDownCompleted, run])


    const handleLogout = () => {

        dispatch(
            update({
                uNumber: "",
                uAcessToken: ""
            })
        )

        navigate("/")
    }

    return (
        <Container maxWidth="lg">

            <Box sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Countdown onComplete={setCountDownCompleted} />

                <Button variant="contained" onClick={handleLogout}>Logout</Button>
            </Box>


            <Box>

                <Typography variant="h3" sx={{ mb: 3 }}>
                    Article List
                </Typography>

                {articleList.map((article) => {

                    return <ArticleCard key={article.id} article={article} />
                })}

            </Box>

        </Container>
    )
}

export default Article;
