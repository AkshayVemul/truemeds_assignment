import React, { useEffect, useMemo, useState } from 'react';

//MUI 
import { TextField, Button, Box } from '@mui/material';

//CUSTOM HOOK
import { useAysnc } from '../util/hooks';

//API RELATED IMPORTS
import axios from 'axios';
import { ENV, SELECTORS, SERVICE } from '../config/apiConfig';

//ROUTER IMPORTS
import { useNavigate } from "react-router-dom";

//GLOBAL STATE IMPORTS
import { useDispatch } from 'react-redux';
import { update } from '../feature/userSlice';
import { update as globalLoaderUpadte } from '../feature/loaderSlice';

//FORM RELATED IMPORTS
import * as yup from 'yup';
import { useFormik } from 'formik';


const OTP_FLOW_STEP = {

    "STEP_1": {
        name: "GET_OTP",
        buttonText: "Get OTP"
    },
    "STEP_2": {
        name: "SUBMIT_OTP",
        buttonText: "SUBMIT"
    },
}

export default function LoginForm() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [flow, setFlow] = useState(OTP_FLOW_STEP["STEP_1"]);

    const userLoginSchema = useMemo(() => {

        return yup.object({
            uNumber: yup
                .string('Enter your Mobile Number')
                .length(10, 'Mobile Number should be of 10 digit')
                .matches(/[6789][0-9]{9}/g, 'Mobile Number should start with 6,7,8,9')
                .required('Mobile Number is required'),
            uOtp: flow.name === "SUBMIT_OTP" ? yup
                .string('Enter your OTP')
                .length(4, 'OTP should be of 10 digit')
                .required('OTP is required') : yup.string(),
        })

    }, [flow.name]);

    const onFormSubmit = () => {

        const API_URL = {

            "GET_OTP": `${ENV.STAGE}${SERVICE.customerService}${SELECTORS.sendOtp}?mobileNo=${values.uNumber}`,

            "SUBMIT_OTP": `${ENV.STAGE}${SERVICE.customerService}${SELECTORS.verifyOtp}?mobileNo=${values.uNumber}&otp=${values.uOtp}&deviceKey=abcd&isIos=false&source=react_interview`
        }

        run(
            axios({
                url: API_URL[flow.name],
                method: 'post',
                headers: {
                    transactionId: ' react_interview'
                },
            })
        )

    }

    const { values, handleChange, touched, errors, handleSubmit } = useFormik({

        initialValues: {
            uNumber: '',
            uOtp: '',
        },

        validationSchema: userLoginSchema,

        onSubmit: onFormSubmit,
    });

    const { state, run } = useAysnc();

    useEffect(() => {

        dispatch(
            globalLoaderUpadte(state.isLoading)
        )

        const isResponseSuccess = state.data?.data?.["201"]

        if (flow.name === "GET_OTP" && isResponseSuccess) {

            setFlow(OTP_FLOW_STEP["STEP_2"])

        } else if (flow.name === "SUBMIT_OTP" && isResponseSuccess) {

            dispatch(
                update({
                    uNumber: values.uNumber,
                    uAcessToken: state.data?.data?.Response?.access_token
                })
            )



            navigate("articles")
        }

    }, [state.isLoading, dispatch, navigate])

    return (

        <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
                <TextField
                    type="number"
                    name='uNumber'
                    value={values.uNumber}
                    onChange={handleChange}
                    label="Enter Mobile Number"
                    autoComplete='off'
                    disabled={flow.name === "SUBMIT_OTP"}
                    sx={{ width: '50ch' }}
                    error={touched.uNumber && Boolean(errors.uNumber)}
                    helperText={touched.uNumber && errors.uNumber}
                />
            </Box>
            {flow.name === "SUBMIT_OTP" &&
                <Box sx={{ mb: 3 }}>
                    <TextField
                        type="number"
                        name='uOtp'
                        value={values.uOtp}
                        onChange={handleChange}
                        label="Enter OTP"
                        autoComplete='off'
                        sx={{ width: '25ch' }}
                        error={touched.uOtp && Boolean(errors.uOtp)}
                        helperText={touched.uOtp && errors.uOtp}
                    />
                </Box>
            }
            <Box>
                <Button variant="contained" type="submit" size="large">{flow.buttonText}</Button>
            </Box>

        </form>

    );
}
