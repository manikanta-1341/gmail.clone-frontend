import * as React from 'react';
import { Box, Divider, Button, Card, CardHeader, CardContent, CardActions, Grid, Typography,IconButton } from '@mui/material'
import jwt_decode from "jwt-decode";
import { Formik } from "formik";
import axios from "axios"
import '../App.css'

import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../constants/constants';
import {url} from '../apis/api'
import { DraftMsg } from '../redux/actions';
import { DeleteMsgsDraft } from '../redux/actions';
export default function SendMail(props) {
    
    const draftMsg = useSelector(state=>state.reducer.draftMsg)
    const dispatch = useDispatch()
    const [token] = React.useState(jwt_decode(window.localStorage.getItem('token')))
    const [mailDetails, setMailDetails] = React.useState({
        to: token.user.username,
        subject: "Demo Mail",
        textarea: "Sample Mail. Ignore It"
    })
    const handleComposeClose = () => {
        dispatch({type:ActionTypes.COMPOSE_DISPLAYCLOSE})
        dispatch(DraftMsg(mailDetails,token.user._id))

    }


    const Validate = (value) => {
        setMailDetails({...mailDetails,to:value.to,subject:value.subject,textarea:value.textarea})
        let error = {}
        if (value.to === "" || !value.to.includes(".com")) {
            error.to = "To address must be a valid one"
        }
        return error
    }

    const Submitfunc = async (e, onSubmitProps) => {
        
        try {
            let response = await axios.post(`${url}/send`, {
                from: token.user.username,
                to: e.to,
                subject: e.subject,
                textarea: e.textarea
            })
            draftMsg !==""?dispatch(DeleteMsgsDraft(token.user._id,[draftMsg])):<></>
            if (!response.data.msg) {
                dispatch({type:ActionTypes.COMPOSE_DISPLAYCLOSE})
                window.location.reload()
                // alert("Email Sent SuccessFully")
            }
            else {
                alert(response.data.msg)
            }
        }
        catch (err) {
            console.log("err", err)
        }
    }
    return (
        <>
            <Box sx={{ position: "absolute", right: 10, bottom: 12, }}>
                <Formik
                    initialValues={draftMsg !== ""?draftMsg:mailDetails}
                    validate={(value) => Validate(value)}
                    onSubmit={(e, onSubmitProps) => Submitfunc(e, onSubmitProps)}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Card variant="outlined" sx={{height:"30rem",width:"30rem"}}>
                                <CardHeader
                                    action={
                                        <IconButton onClick={()=>handleComposeClose()}>
                                          x
                                        </IconButton>
                                    }
                                    title="New Message"
                                    sx={{ bgcolor: 'text.secondary', p: "0.6rem",pr:"1.2rem" }}
                                />
                                <CardContent sx={{p:"0.5rem"}}>
                                    <Grid container display='flex' alignItems="center">
                                        <Grid item >
                                            <Typography>To:</Typography>
                                        </Grid>
                                        <Grid item >
                                            <input type="text" name="to" className="to_input" required onBlur={handleBlur} onChange={handleChange} value={values.to} />
                                        </Grid>
                                    </Grid>
                                    <Typography color="red">{touched.to && errors.to}</Typography>
                                    <Divider />
                                    <Grid container display='flex' justifyContent="flex-start" alignItems="center">
                                        <Grid item>
                                            <Typography>Subject:</Typography>
                                        </Grid>
                                        <Grid>
                                            <input type="text" name="subject" className="subject_input" onChange={handleChange} value={values.subject} />
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <textarea name="textarea" className="textarea_input" rows="9" cols="48" onChange={handleChange} value={values.textarea} />
                                    <Divider />
                                </CardContent>
                                <CardActions>
                                    <Button type="submit" sx={{ ml: "auto" }} variant="contained">Send</Button>
                                </CardActions>
                            </Card>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}